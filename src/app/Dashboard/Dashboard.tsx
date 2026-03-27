import * as React from 'react';
import {
  PageSection,
  Title,
  Stack,
  StackItem,
  Flex,
  FlexItem,
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  SearchInput,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
  MenuToggleElement
} from '@patternfly/react-core';
import { PlusCircleIcon, FilterIcon, ThIcon } from '@patternfly/react-icons';
import './GlassCard.css';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { OpenShiftChatBot } from './ChatBotComponent';
import { clusterData } from './OpenShiftClusterComponents';
import { DraggableCard } from './DraggableCard';
import { WidgetPicker } from './WidgetPicker';
import { DropZone } from './DropZone';
import { getWidgetById } from './WidgetRegistry';
import { AIWidgetBuilder } from './AIWidgetBuilder';

const STORAGE_KEY = 'dashboard-widgets';
const STORAGE_KEY_SIZES = 'dashboard-widget-sizes';

const DEFAULT_WIDGETS = [
  'cluster-overview',
  'resource-utilization',
  'workloads-overview',
  'cluster-alerts',
  'recent-events',
  'quick-actions'
];

const getSizeFromColumns = (columns: number): string => {
  if (columns >= 3) return 'full';
  if (columns >= 2) return 'medium';
  return 'small';
};

const Dashboard: React.FunctionComponent = () => {
  const [widgets, setWidgets] = React.useState<string[]>(() => {
    // Load widgets from localStorage or use defaults
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_WIDGETS;
  });

  const [widgetSizes, setWidgetSizes] = React.useState<Record<string, number>>(() => {
    // Load widget sizes from localStorage
    const stored = localStorage.getItem(STORAGE_KEY_SIZES);
    return stored ? JSON.parse(stored) : {};
  });

  const [isPickerOpen, setIsPickerOpen] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [isAIBuilderOpen, setIsAIBuilderOpen] = React.useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Save to localStorage whenever widgets change
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
  }, [widgets]);

  // Save to localStorage whenever widget sizes change
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SIZES, JSON.stringify(widgetSizes));
  }, [widgetSizes]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setIsDragging(false);

    if (over) {
      // Check if dropping on a drop zone
      if (typeof over.id === 'string' && over.id.startsWith('drop-zone-')) {
        const dropIndex = parseInt(over.id.replace('drop-zone-', ''));
        setWidgets((items) => {
          const oldIndex = items.indexOf(active.id as string);
          const newItems = [...items];
          const [removed] = newItems.splice(oldIndex, 1);
          newItems.splice(dropIndex, 0, removed);
          return newItems;
        });
      } else if (active.id !== over.id) {
        // Dropping on another widget
        setWidgets((items) => {
          const oldIndex = items.indexOf(active.id as string);
          const newIndex = items.indexOf(over.id as string);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  };

  const handleAddWidget = (widgetId: string) => {
    if (!widgets.includes(widgetId)) {
      setWidgets([...widgets, widgetId]);
    }
  };

  const handleRemoveWidget = (widgetId: string) => {
    setWidgets(widgets.filter(id => id !== widgetId));
  };

  const handleResizeWidget = (widgetId: string, columns: number) => {
    setWidgetSizes((prev) => ({
      ...prev,
      [widgetId]: columns,
    }));
  };

  return (
    <PageSection hasBodyWrapper={false}>
      <Stack hasGutter>
        {/* Header */}
        <StackItem>
          <Title headingLevel="h1" size="lg">
            Widgetized Dashboard Demo
          </Title>
          <p>
            Monitor and manage your {clusterData.cluster.name} cluster resources and workloads.
          </p>
        </StackItem>

        {/* Toolbar */}
        <StackItem>
          <Toolbar>
            <ToolbarContent>
              <ToolbarItem variant="search-filter">
                <SearchInput
                  placeholder="Search"
                  value={searchValue}
                  onChange={(_event, value) => setSearchValue(value)}
                  onClear={() => setSearchValue('')}
                />
              </ToolbarItem>
              <ToolbarItem>
                <Button variant="plain" aria-label="View">
                  <ThIcon />
                </Button>
              </ToolbarItem>
              <ToolbarItem>
                <Dropdown
                  isOpen={isFiltersOpen}
                  onSelect={() => setIsFiltersOpen(false)}
                  onOpenChange={(isOpen: boolean) => setIsFiltersOpen(isOpen)}
                  toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                      isExpanded={isFiltersOpen}
                    >
                      Filters
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    <DropdownItem key="all">All widgets</DropdownItem>
                    <DropdownItem key="overview">Overview</DropdownItem>
                    <DropdownItem key="performance">Performance</DropdownItem>
                  </DropdownList>
                </Dropdown>
              </ToolbarItem>
              <ToolbarItem alignment={{ default: 'alignRight' }}>
                <Flex gap={{ default: 'gapSm' }}>
                  <FlexItem>
                    <Button
                      variant="secondary"
                      onClick={() => setIsAIBuilderOpen(true)}
                    >
                      AI Widget Builder
                    </Button>
                  </FlexItem>
                  <FlexItem>
                    <Button
                      variant="primary"
                      icon={<PlusCircleIcon />}
                      onClick={() => setIsPickerOpen(true)}
                    >
                      Add widgets
                    </Button>
                  </FlexItem>
                </Flex>
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>
        </StackItem>

        {/* Draggable Widgets */}
        <StackItem>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={widgets}
              strategy={rectSortingStrategy}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: 'minmax(min-content, max-content)', gap: 'var(--pf-t--global--spacer--md)', alignItems: 'start' }}>
                {widgets.map((widgetId, index) => {
                  const widgetConfig = getWidgetById(widgetId);
                  if (!widgetConfig) return null;

                  const WidgetComponent = widgetConfig.component;
                  const props = widgetConfig.defaultProps || {};

                  // Use stored size or default from config (1, 2, or 3 columns)
                  const columns = widgetSizes[widgetId] ||
                    (widgetConfig.defaultSize === 'full' ? 3 :
                     widgetConfig.defaultSize === 'medium' ? 2 : 1);

                  return (
                    <React.Fragment key={widgetId}>
                      {/* Drop zone before first item */}
                      {isDragging && index === 0 && (
                        <DropZone id={`drop-zone-0`} span={columns} />
                      )}

                      {/* Widget card */}
                      <DraggableCard
                        id={widgetId}
                        onRemove={handleRemoveWidget}
                        onResize={handleResizeWidget}
                        currentColumns={columns}
                      >
                        <WidgetComponent {...props} />
                      </DraggableCard>

                      {/* Drop zone after each item */}
                      {isDragging && (
                        <DropZone id={`drop-zone-${index + 1}`} span={columns} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        </StackItem>

        {widgets.length === 0 && (
          <StackItem>
            <div style={{
              textAlign: 'center',
              padding: '48px'
            }}>
              <p style={{ marginBottom: '16px' }}>
                No widgets on your dashboard. Click "Add Widget" to get started.
              </p>
              <Button
                variant="primary"
                icon={<PlusCircleIcon />}
                onClick={() => setIsPickerOpen(true)}
              >
                Add Your First Widget
              </Button>
            </div>
          </StackItem>
        )}
      </Stack>

      {/* Widget Picker Modal */}
      <WidgetPicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onAddWidget={handleAddWidget}
        activeWidgetIds={widgets}
      />

      {/* AI Widget Builder Modal */}
      <AIWidgetBuilder
        isOpen={isAIBuilderOpen}
        onClose={() => setIsAIBuilderOpen(false)}
      />

      {/* OpenShift ChatBot - Floating Assistant */}
      <OpenShiftChatBot />
    </PageSection>
  );
};

export { Dashboard };
