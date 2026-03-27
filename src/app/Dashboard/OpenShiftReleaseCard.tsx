import * as React from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Badge,
  List,
  ListItem,
  Flex,
  FlexItem,
  Stack,
  StackItem,
  Divider,
} from '@patternfly/react-core';
import {
  TimesIcon,
  ExternalLinkAltIcon,
  CheckCircleIcon,
  InfoCircleIcon,
  BugIcon,
  RocketIcon,
} from '@patternfly/react-icons';
import { SecondaryButton, LinkButton } from '@app/Button/Button';

interface OpenShiftReleaseCardProps {
  onDismiss?: () => void;
}

const openShiftReleaseData = {
  version: "4.19",
  releaseDate: "Released June 2025",
  announcementDate: "June 17, 2025",
  status: "Current Release",
  description: "Unified AI-powered platform experience with enhanced virtualization, developer productivity, and operational efficiency across hybrid cloud environments.",
  keyFeatures: [
    { title: "OpenShift Lightspeed AI Assistant", badge: "New" },
    { title: "Simultaneous VM Migrations", badge: "New" },
    { title: "Enhanced CI/CD Integration", badge: "Enhanced" },
    { title: "Container Build Efficiency", badge: "Improved" },
    { title: "DevOps Tooling Support", badge: "Enhanced" },
    { title: "Unified Admin & Developer UX", badge: "New" }
  ],
  highlights: [
    "AI-powered query assistance for streamlined workflows",
    "Zero-downtime VM migrations for maintenance operations",
    "Improved container build efficiency and CI/CD pipelines",
    "Enhanced DevOps tooling integration and automation",
    "Unified perspective for both developers and administrators",
    "Version 4.18 enters maintenance mode (EOL: September 2025)"
  ],
  upgradeReasons: [
    "🚀 Boosted Productivity: AI assistants speed up daily tasks",
    "🔄 Operational Flexibility: No-downtime VM migrations",
    "📈 Staying Current: Continued support beyond 4.18 EOL"
  ],
  supportInfo: {
    current: "4.19 (active support)",
    previous: "4.18 (maintenance until September 2025)",
    recommendation: "Upgrade recommended before 4.18 EOL"
  },
  links: {
    releaseNotes: "https://docs.openshift.com/container-platform/4.19/release_notes/ocp-4-19-release-notes.html",
    explore: "https://docs.openshift.com/container-platform/4.19/",
    migration: "https://docs.openshift.com/container-platform/4.19/updating/index.html"
  }
};

export const OpenShiftReleaseCard: React.FunctionComponent<OpenShiftReleaseCardProps> = ({ onDismiss }) => {
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'New':
        return 'green';
      case 'Enhanced':
        return 'red';
      case 'Improved':
        return 'orange';
      default:
        return 'blue';
    }
  };

    return (
    <Card className="glass-card">
      <CardTitle>
        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
          <FlexItem>
            <RocketIcon />
          </FlexItem>
          <FlexItem>
            What's New in OpenShift {openShiftReleaseData.version}
          </FlexItem>
        </Flex>
      </CardTitle>

      <CardBody>
        <Stack hasGutter>
          <StackItem>
            <p>{openShiftReleaseData.description}</p>
          </StackItem>

          <StackItem>
            <List isPlain>
              {openShiftReleaseData.keyFeatures.slice(0, 4).map((feature, index) => (
                <ListItem key={index}>
                  <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                    <FlexItem>
                      <CheckCircleIcon />
                    </FlexItem>
                    <FlexItem flex={{ default: 'flex_1' }}>
                      {feature.title}
                    </FlexItem>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </StackItem>
        </Stack>
      </CardBody>

      <CardFooter>
        <LinkButton
          variant="primary"
          onClick={() => window.open(openShiftReleaseData.links.releaseNotes, '_blank')}
        >
          View Release Notes
        </LinkButton>
      </CardFooter>
    </Card>
  );
};

export default OpenShiftReleaseCard; 