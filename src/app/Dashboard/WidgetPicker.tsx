import * as React from 'react';
import {
  Modal,
  ModalVariant,
  ModalHeader,
  Button,
  Card,
  CardTitle,
  CardBody,
  Grid,
  GridItem,
  Label,
  Flex,
  FlexItem
} from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { AVAILABLE_WIDGETS, WidgetConfig } from './WidgetRegistry';

interface WidgetPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWidget: (widgetId: string) => void;
  activeWidgetIds: string[];
}

export const WidgetPicker: React.FunctionComponent<WidgetPickerProps> = ({
  isOpen,
  onClose,
  onAddWidget,
  activeWidgetIds
}) => {
  const handleAddWidget = (widgetId: string) => {
    onAddWidget(widgetId);
    onClose();
  };

  return (
    <Modal
      variant={ModalVariant.large}
      isOpen={isOpen}
      onClose={onClose}
      actions={[
        <Button key="close" variant="secondary" onClick={onClose}>
          Close
        </Button>
      ]}
    >
      <ModalHeader title="Add widgets" />
      <div style={{ padding: '24px' }}>
        <p style={{ marginBottom: '24px' }}>
          Select a widget to add to your dashboard. You can reorder widgets by dragging them.
        </p>
        <Grid hasGutter span={4}>
          {AVAILABLE_WIDGETS.map((widget) => {
            const isActive = activeWidgetIds.includes(widget.id);
            return (
              <GridItem key={widget.id}>
                <Card
                  isClickable={!isActive}
                  isSelectable={!isActive}
                  isCompact
                  isFullHeight
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      handleAddWidget(widget.id);
                    }
                  }}
                >
                  <CardTitle>
                    <Flex alignItems={{ default: 'alignItemsCenter' }} justifyContent={{ default: 'justifyContentSpaceBetween' }}>
                      <FlexItem>
                        {widget.name}
                      </FlexItem>
                      <FlexItem>
                        <Label isCompact>
                          {widget.category}
                        </Label>
                      </FlexItem>
                    </Flex>
                  </CardTitle>
                  <CardBody>
                    <p>
                      <small>{widget.description}</small>
                    </p>
                    {isActive ? (
                      <div>
                        <small>Already on dashboard</small>
                      </div>
                    ) : (
                      <div>
                        <PlusCircleIcon /> <small>Click to add</small>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </GridItem>
            );
          })}
        </Grid>
      </div>
    </Modal>
  );
};
