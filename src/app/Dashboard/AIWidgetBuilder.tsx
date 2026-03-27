import * as React from 'react';
import {
  Modal,
  ModalVariant,
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  TextInput,
  Tabs,
  Tab,
  TabTitleText,
  Title,
  Stack,
  StackItem,
  Flex,
  FlexItem,
  InputGroup,
  InputGroupItem,
} from '@patternfly/react-core';
import {
  MicrophoneIcon,
  ArrowRightIcon,
  StarIcon,
  DatabaseIcon,
  BookIcon,
  CalendarAltIcon,
  CommentsIcon,
  QuestionCircleIcon,
  GripVerticalIcon
} from '@patternfly/react-icons';

interface AIWidgetBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

const preConfiguredWidgets = [
  { id: 'favorites', name: 'My favorite services', icon: StarIcon },
  { id: 'integrations', name: 'Data integrations', icon: DatabaseIcon },
  { id: 'learning', name: 'Learning resources', icon: BookIcon },
  { id: 'events', name: 'Events', icon: CalendarAltIcon },
  { id: 'ask', name: 'Ask Red Hat', icon: CommentsIcon },
  { id: 'support', name: 'Support', icon: QuestionCircleIcon },
];

export const AIWidgetBuilder: React.FunctionComponent<AIWidgetBuilderProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [prompt, setPrompt] = React.useState('');

  return (
    <Modal
      variant={ModalVariant.large}
      isOpen={isOpen}
      onClose={onClose}
      style={{ width: '90vw', maxWidth: '1400px' }}
    >
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} style={{ marginBottom: '24px' }}>
          <FlexItem>
            <Title headingLevel="h2" size="xl">
              Welcome to your Hybrid Cloud Console
            </Title>
          </FlexItem>
          <FlexItem>
            <Flex gap={{ default: 'gapMd' }}>
              <FlexItem>
                <Button variant="link">Reset to default</Button>
              </FlexItem>
              <FlexItem>
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>

        <Grid hasGutter span={4}>
          {/* Pre-configured widgets */}
          <GridItem span={3}>
            <Card>
              <CardBody>
                <Title headingLevel="h3" size="md" style={{ marginBottom: '8px' }}>
                  <Flex gap={{ default: 'gapSm' }} alignItems={{ default: 'alignItemsCenter' }}>
                    <FlexItem>
                      <GripVerticalIcon />
                    </FlexItem>
                    <FlexItem>
                      Pre-configured widgets
                    </FlexItem>
                  </Flex>
                </Title>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                  Drag these directly into your dashboard.
                </p>
                <Stack hasGutter>
                  {preConfiguredWidgets.map((widget) => {
                    const Icon = widget.icon;
                    return (
                      <StackItem key={widget.id}>
                        <Card isCompact isSelectable>
                          <CardBody>
                            <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
                              <FlexItem>
                                <Flex gap={{ default: 'gapSm' }} alignItems={{ default: 'alignItemsCenter' }}>
                                  <FlexItem>
                                    <Icon />
                                  </FlexItem>
                                  <FlexItem>
                                    {widget.name}
                                  </FlexItem>
                                </Flex>
                              </FlexItem>
                              <FlexItem>
                                <GripVerticalIcon />
                              </FlexItem>
                            </Flex>
                          </CardBody>
                        </Card>
                      </StackItem>
                    );
                  })}
                </Stack>
              </CardBody>
            </Card>
          </GridItem>

          {/* Widget builder */}
          <GridItem span={5}>
            <Card>
              <CardBody>
                <Title headingLevel="h3" size="md" style={{ marginBottom: '8px' }}>
                  Widget builder
                </Title>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                  Create custom dynamic widgets with generative AI or static content widgets with markdown.{' '}
                  <a href="#">Learn more about creating custom widgets.</a>
                </p>

                <Tabs
                  activeKey={activeTabKey}
                  onSelect={(_event, tabIndex) => setActiveTabKey(tabIndex)}
                  style={{ marginBottom: '16px' }}
                >
                  <Tab eventKey={0} title={<TabTitleText>Create with AI</TabTitleText>} />
                  <Tab eventKey={1} title={<TabTitleText>Create with Markdown</TabTitleText>} />
                </Tabs>

                {activeTabKey === 0 && (
                  <div>
                    <div style={{
                      background: 'var(--pf-t--global--background--color--secondary--default)',
                      padding: '16px',
                      borderRadius: '8px',
                      marginBottom: '16px'
                    }}>
                      <Flex gap={{ default: 'gapSm' }} style={{ marginBottom: '8px' }}>
                        <FlexItem>Widget Builder</FlexItem>
                        <FlexItem>AI</FlexItem>
                        <FlexItem>1:30 PM</FlexItem>
                      </Flex>
                      <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        What do you need out of your widget?
                      </p>
                      <Button variant="link" isInline>
                        View example prompts
                      </Button>
                    </div>

                    <InputGroup>
                      <InputGroupItem isFill>
                        <TextInput
                          type="text"
                          placeholder="What do you want your widget to do?"
                          value={prompt}
                          onChange={(_event, value) => setPrompt(value)}
                        />
                      </InputGroupItem>
                      <InputGroupItem>
                        <Button variant="plain" aria-label="Voice input">
                          <MicrophoneIcon />
                        </Button>
                      </InputGroupItem>
                      <InputGroupItem>
                        <Button variant="primary" aria-label="Submit">
                          <ArrowRightIcon />
                        </Button>
                      </InputGroupItem>
                    </InputGroup>
                    <p style={{ fontSize: '12px', marginTop: '8px', textAlign: 'center' }}>
                      Chatbot uses AI. Check for mistakes.
                    </p>
                  </div>
                )}

                {activeTabKey === 1 && (
                  <div>
                    <p>Create widgets using Markdown syntax.</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </GridItem>

          {/* Widget preview */}
          <GridItem span={4}>
            <Card>
              <CardBody>
                <Title headingLevel="h3" size="md" style={{ marginBottom: '16px' }}>
                  Widget preview: AI-generated
                </Title>
                <div style={{
                  background: 'var(--pf-t--global--background--color--secondary--default)',
                  padding: '48px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  minHeight: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <p style={{ color: 'var(--pf-t--global--text--color--subtle)' }}>
                    Submit a prompt and we will render it here
                  </p>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        {/* Footer actions */}
        <Flex justifyContent={{ default: 'justifyContentFlexEnd' }} style={{ marginTop: '24px' }}>
          <Flex gap={{ default: 'gapMd' }}>
            <FlexItem>
              <Button variant="link">Reset</Button>
            </FlexItem>
            <FlexItem>
              <Button variant="secondary">Add to dashboard</Button>
            </FlexItem>
          </Flex>
        </Flex>
      </div>
    </Modal>
  );
};
