import * as React from 'react';
import {
  PageSection,
  Title,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardTitle,
  Stack,
  StackItem,
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import {
  Button,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  LinkButton,
  PlainButton,
} from './Button';
import { 
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  ExternalLinkAltIcon,
  SpinnerIcon 
} from '@patternfly/react-icons';

const ButtonExample: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <PageSection hasBodyWrapper={false}>
      <Stack hasGutter>
        <StackItem>
          <Title headingLevel="h1" size="lg">
            Button Components
          </Title>
        </StackItem>

        <StackItem>
          <Grid hasGutter>
            {/* Basic Variants */}
            <GridItem span={6}>
              <Card>
                <CardTitle>Basic Button Variants</CardTitle>
                <CardBody>
                  <Flex direction={{ default: 'column' }} gap={{ default: 'gapMd' }}>
                    <FlexItem>
                      <PrimaryButton>Primary Action</PrimaryButton>
                    </FlexItem>
                    <FlexItem>
                      <SecondaryButton>Secondary Action</SecondaryButton>
                    </FlexItem>
                    <FlexItem>
                      <DangerButton>Danger Action</DangerButton>
                    </FlexItem>
                    <FlexItem>
                      <LinkButton>Link Action</LinkButton>
                    </FlexItem>
                    <FlexItem>
                      <PlainButton>Plain Action</PlainButton>
                    </FlexItem>
                  </Flex>
                </CardBody>
              </Card>
            </GridItem>

            {/* Button States */}
            <GridItem span={6}>
              <Card>
                <CardTitle>Button States</CardTitle>
                <CardBody>
                  <Flex direction={{ default: 'column' }} gap={{ default: 'gapMd' }}>
                    <FlexItem>
                      <Button variant="primary">Normal State</Button>
                    </FlexItem>
                    <FlexItem>
                      <Button variant="primary" isDisabled>
                        Disabled State
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button
                        variant="primary"
                        isLoading={isLoading}
                        onClick={handleLoadingClick}
                      >
                        {isLoading ? 'Loading...' : 'Click for Loading State'}
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button variant="primary" isDanger>
                        Danger State
                      </Button>
                    </FlexItem>
                  </Flex>
                </CardBody>
              </Card>
            </GridItem>

            {/* Buttons with Icons */}
            <GridItem span={6}>
              <Card>
                <CardTitle>Buttons with Icons</CardTitle>
                <CardBody>
                  <Flex direction={{ default: 'column' }} gap={{ default: 'gapMd' }}>
                    <FlexItem>
                      <Button variant="primary" icon={<PlusIcon />}>
                        Add Item
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button variant="secondary" icon={<EditIcon />}>
                        Edit Item
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button variant="danger" icon={<TrashIcon />}>
                        Delete Item
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button 
                        variant="link" 
                        icon={<ExternalLinkAltIcon />}
                        iconPosition="end"
                      >
                        External Link
                      </Button>
                    </FlexItem>
                  </Flex>
                </CardBody>
              </Card>
            </GridItem>

            {/* Button Sizes */}
            <GridItem span={6}>
              <Card>
                <CardTitle>Button Sizes</CardTitle>
                <CardBody>
                  <Flex direction={{ default: 'column' }} gap={{ default: 'gapMd' }}>
                    <FlexItem>
                      <Button variant="primary" size="sm">
                        Small Button
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button variant="primary">
                        Default Button
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button variant="primary" size="lg">
                        Large Button
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button variant="primary" isFullWidth>
                        Full Width Button
                      </Button>
                    </FlexItem>
                  </Flex>
                </CardBody>
              </Card>
            </GridItem>

            {/* Interactive Examples */}
            <GridItem span={12}>
              <Card>
                <CardTitle>Interactive Button Groups</CardTitle>
                <CardBody>
                  <Flex gap={{ default: 'gapMd' }}>
                    <FlexItem>
                      <PrimaryButton onClick={() => alert('Primary action clicked!')}>
                        Save Changes
                      </PrimaryButton>
                    </FlexItem>
                    <FlexItem>
                      <SecondaryButton onClick={() => alert('Secondary action clicked!')}>
                        Cancel
                      </SecondaryButton>
                    </FlexItem>
                    <FlexItem>
                      <LinkButton onClick={() => alert('Link action clicked!')}>
                        Learn More
                      </LinkButton>
                    </FlexItem>
                  </Flex>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </StackItem>
      </Stack>
    </PageSection>
  );
};

export { ButtonExample }; 