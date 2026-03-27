import * as React from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
  Stack,
  StackItem,
  Progress,
  Label,
  Badge,
  List,
  ListItem,
  Flex,
  FlexItem,
  Divider,
  Alert,
  AlertGroup,
} from '@patternfly/react-core';
import {
  TrendUpIcon,
  TrendDownIcon,
  UsersIcon,
  MoneyBillIcon,
  ChartLineIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InfoCircleIcon,
} from '@patternfly/react-icons';
import { PrimaryButton, SecondaryButton } from '@app/Button/Button';
import OpenShiftReleaseCard from './OpenShiftReleaseCard';

// Mock data for the dashboard
const dashboardData = {
  stats: [
    {
      title: 'Total Users',
      value: '12,543',
      change: '+12%',
      trend: 'up',
      icon: UsersIcon,
      color: 'blue',
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: '+8%',
      trend: 'up',
      icon: MoneyBillIcon,
      color: 'green',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-2%',
      trend: 'down',
      icon: ChartLineIcon,
      color: 'orange',
    },
    {
      title: 'Active Sessions',
      value: '1,423',
      change: '+15%',
      trend: 'up',
      icon: ChartLineIcon,
      color: 'purple',
    },
  ],
  recentActivity: [
    { action: 'New user registration', time: '2 minutes ago', status: 'success' },
    { action: 'Payment processed', time: '5 minutes ago', status: 'success' },
    { action: 'Server maintenance completed', time: '1 hour ago', status: 'info' },
    { action: 'High memory usage detected', time: '2 hours ago', status: 'warning' },
    { action: 'Database backup completed', time: '3 hours ago', status: 'success' },
  ],
  projects: [
    { name: 'E-commerce Platform', progress: 85, status: 'On Track', dueDate: 'Dec 15' },
    { name: 'Mobile App Redesign', progress: 60, status: 'At Risk', dueDate: 'Jan 20' },
    { name: 'API Documentation', progress: 95, status: 'Complete', dueDate: 'Nov 30' },
    { name: 'Security Audit', progress: 30, status: 'Just Started', dueDate: 'Feb 10' },
  ],
  alerts: [
    { type: 'danger', title: 'System Alert', message: 'High CPU usage detected on server-01' },
    { type: 'warning', title: 'Maintenance', message: 'Scheduled maintenance in 2 hours' },
    { type: 'success', title: 'Deployment', message: 'Version 2.1.0 deployed successfully' },
  ],
};

export const StatsCard: React.FunctionComponent<{
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<any>;
  color: string;
}> = ({ title, value, change, trend, icon: Icon, color }) => (
  <Card isCompact className="glass-card">
    <CardBody>
      <Flex alignItems={{ default: 'alignItemsCenter' }}>
        <FlexItem>
          <div style={{ 
            padding: '12px', 
            borderRadius: '8px', 
            backgroundColor: `var(--pf-v6-global--palette--${color}-50)`,
            color: `var(--pf-v6-global--palette--${color}-600)`
          }}>
            <Icon size="md" />
          </div>
        </FlexItem>
        <FlexItem flex={{ default: 'flex_1' }}>
          <Stack>
                         <StackItem>
               <div>
                 <p style={{ fontSize: '0.875rem', margin: '0 0 4px 0', color: 'var(--pf-v6-global--Color--200)' }}>{title}</p>
                 <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 'bold' }}>{value}</h2>
               </div>
             </StackItem>
            <StackItem>
              <Flex alignItems={{ default: 'alignItemsCenter' }}>
                <FlexItem>
                  {trend === 'up' ? (
                    <TrendUpIcon style={{ color: 'var(--pf-v6-global--success-color--100)' }} />
                  ) : (
                    <TrendDownIcon style={{ color: 'var(--pf-v6-global--danger-color--100)' }} />
                  )}
                </FlexItem>
                                 <FlexItem>
                   <span 
                     style={{ 
                       fontSize: '0.875rem',
                       color: trend === 'up' 
                         ? 'var(--pf-v6-global--success-color--100)' 
                         : 'var(--pf-v6-global--danger-color--100)' 
                     }}
                   >
                     {change}
                   </span>
                 </FlexItem>
              </Flex>
            </StackItem>
          </Stack>
        </FlexItem>
      </Flex>
    </CardBody>
  </Card>
);

export const RecentActivityCard: React.FunctionComponent = () => (
  <Card className="glass-card">
    <CardTitle>Recent Activity</CardTitle>
    <CardBody>
      <List isPlain>
        {dashboardData.recentActivity.map((activity, index) => (
          <ListItem key={index}>
            <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
              <FlexItem>
                {activity.status === 'success' && <CheckCircleIcon color="var(--pf-v6-global--success-color--100)" />}
                {activity.status === 'warning' && <ExclamationTriangleIcon color="var(--pf-v6-global--warning-color--100)" />}
                {activity.status === 'info' && <InfoCircleIcon color="var(--pf-v6-global--info-color--100)" />}
              </FlexItem>
                             <FlexItem flex={{ default: 'flex_1' }}>
                 <span>{activity.action}</span>
               </FlexItem>
               <FlexItem>
                 <span style={{ fontSize: '0.875rem', color: 'var(--pf-v6-global--Color--200)' }}>{activity.time}</span>
               </FlexItem>
            </Flex>
            {index < dashboardData.recentActivity.length - 1 && (
              <Divider style={{ margin: '8px 0' }} />
            )}
          </ListItem>
        ))}
      </List>
    </CardBody>
    <CardFooter>
      <SecondaryButton size="sm">View All Activity</SecondaryButton>
    </CardFooter>
  </Card>
);

export const ProjectsCard: React.FunctionComponent = () => (
  <Card className="glass-card">
    <CardTitle>Active Projects</CardTitle>
    <CardBody>
      <Stack hasGutter>
        {dashboardData.projects.map((project, index) => (
          <StackItem key={index}>
            <Flex direction={{ default: 'column' }} gap={{ default: 'gapSm' }}>
              <FlexItem>
                <Flex alignItems={{ default: 'alignItemsCenter' }} justifyContent={{ default: 'justifyContentSpaceBetween' }}>
                                     <FlexItem>
                     <h6 style={{ margin: 0, fontSize: '1rem' }}>{project.name}</h6>
                   </FlexItem>
                  <FlexItem>
                    <Label 
                      color={
                        project.status === 'Complete' ? 'green' :
                        project.status === 'On Track' ? 'blue' :
                        project.status === 'At Risk' ? 'orange' : 'grey'
                      }
                    >
                      {project.status}
                    </Label>
                  </FlexItem>
                </Flex>
              </FlexItem>
              <FlexItem>
                <Progress 
                  value={project.progress} 
                  title={`${project.progress}%`}
                  variant={
                    project.progress >= 90 ? 'success' :
                    project.progress >= 70 ? undefined :
                    project.progress >= 50 ? 'warning' : 'danger'
                  }
                />
              </FlexItem>
                             <FlexItem>
                 <span style={{ fontSize: '0.875rem', color: 'var(--pf-v6-global--Color--200)' }}>Due: {project.dueDate}</span>
               </FlexItem>
            </Flex>
          </StackItem>
        ))}
      </Stack>
    </CardBody>
    <CardFooter>
      <PrimaryButton size="sm">View All Projects</PrimaryButton>
    </CardFooter>
  </Card>
);

export const AlertsCard: React.FunctionComponent = () => (
  <Card className="glass-card">
    <CardTitle>System Alerts</CardTitle>
    <CardBody>
      <AlertGroup>
        {dashboardData.alerts.map((alert, index) => (
          <Alert 
            key={index}
            variant={alert.type as any}
            title={alert.title}
            isInline
          >
            {alert.message}
          </Alert>
        ))}
      </AlertGroup>
    </CardBody>
    <CardFooter>
      <SecondaryButton size="sm">Manage Alerts</SecondaryButton>
    </CardFooter>
  </Card>
);

export const QuickActionsCard: React.FunctionComponent = () => (
  <Card className="glass-card">
    <CardTitle>Quick Actions</CardTitle>
    <CardBody>
      <Grid hasGutter>
        <GridItem span={6}>
          <PrimaryButton isFullWidth>
            Create Project
          </PrimaryButton>
        </GridItem>
        <GridItem span={6}>
          <SecondaryButton isFullWidth>
            Add User
          </SecondaryButton>
        </GridItem>
        <GridItem span={6}>
          <SecondaryButton isFullWidth>
            Generate Report
          </SecondaryButton>
        </GridItem>
        <GridItem span={6}>
          <SecondaryButton isFullWidth>
            System Settings
          </SecondaryButton>
        </GridItem>
      </Grid>
    </CardBody>
  </Card>
);

export const OpenShiftUpdatesCard: React.FunctionComponent<{ onDismiss?: () => void }> = ({ onDismiss }) => (
  <OpenShiftReleaseCard onDismiss={onDismiss} />
);

export { dashboardData }; 