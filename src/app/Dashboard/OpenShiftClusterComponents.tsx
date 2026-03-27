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
  CubeIcon,
  CubesIcon,
  NetworkIcon,
  ServerIcon,
  DatabaseIcon,
  MemoryIcon,
  CpuIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InfoCircleIcon,
  TimesCircleIcon,
  ClusterIcon,
} from '@patternfly/react-icons';
import { PrimaryButton, SecondaryButton } from '@app/Button/Button';
import WelcomeCard from './WelcomeCard';

// Mock OpenShift cluster data
const clusterData = {
  cluster: {
    name: "production-cluster-01",
    version: "4.19.0",
    status: "Healthy",
    region: "us-east-1",
    uptime: "45 days"
  },
  nodes: {
    total: 12,
    ready: 11,
    notReady: 1,
    masters: 3,
    workers: 9
  },
  workloads: {
    namespaces: 28,
    pods: 147,
    services: 82,
    deployments: 45,
    statefulSets: 12,
    daemonSets: 8
  },
  resources: {
    cpu: { used: 68, total: 100, unit: "cores" },
    memory: { used: 142, total: 256, unit: "GiB" },
    storage: { used: 1.2, total: 5.0, unit: "TiB" },
    pods: { used: 147, total: 250, unit: "pods" }
  },
  alerts: [
    { type: 'warning', title: 'High Memory Usage', message: 'Node worker-03 memory usage at 85%', severity: 'warning' },
    { type: 'danger', title: 'Node Not Ready', message: 'worker-05 is in NotReady state', severity: 'critical' },
    { type: 'info', title: 'Update Available', message: 'OpenShift 4.19.1 is available', severity: 'info' }
  ],
  recentEvents: [
    { event: 'Pod nginx-deployment-7d7c6f8b9-x7k2m created', time: '2 minutes ago', status: 'success' },
    { event: 'Service frontend-service updated', time: '5 minutes ago', status: 'info' },
    { event: 'Node worker-05 became NotReady', time: '12 minutes ago', status: 'warning' },
    { event: 'Deployment backend-api scaled to 5 replicas', time: '20 minutes ago', status: 'success' },
    { event: 'PersistentVolume pv-data-001 bound', time: '35 minutes ago', status: 'success' }
  ]
};

export const ClusterOverviewCard: React.FunctionComponent = () => (
  <Card className="glass-card">
    <CardTitle>
      <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
        <FlexItem>
          <ClusterIcon />
        </FlexItem>
        <FlexItem>
          Cluster Overview
        </FlexItem>
        <FlexItem>
          <Label color="green">
            {clusterData.cluster.status}
          </Label>
        </FlexItem>
      </Flex>
    </CardTitle>
    <CardBody>
      <Stack hasGutter>
        <StackItem>
          <strong>{clusterData.cluster.name}</strong>
        </StackItem>
        <StackItem>
          <Grid hasGutter>
            <GridItem span={6}>
              <div><small>Version:</small></div>
              <div>{clusterData.cluster.version}</div>
            </GridItem>
            <GridItem span={6}>
              <div><small>Region:</small></div>
              <div>{clusterData.cluster.region}</div>
            </GridItem>
            <GridItem span={6}>
              <div><small>Uptime:</small></div>
              <div>{clusterData.cluster.uptime}</div>
            </GridItem>
            <GridItem span={6}>
              <div><small>Nodes:</small></div>
              <div>{clusterData.nodes.ready}/{clusterData.nodes.total} Ready</div>
            </GridItem>
          </Grid>
        </StackItem>
      </Stack>
    </CardBody>
  </Card>
);

export const ResourceUtilizationCard: React.FunctionComponent = () => (
  <Card className="glass-card">
    <CardTitle>Resource Utilization</CardTitle>
    <CardBody>
      <Stack hasGutter>
        {Object.entries(clusterData.resources).map(([resource, data]) => {
          const percentage = Math.round((data.used / data.total) * 100);
          const getIcon = (res: string) => {
            switch (res) {
              case 'cpu': return <CpuIcon />;
              case 'memory': return <MemoryIcon />;
              case 'storage': return <DatabaseIcon />;
              case 'pods': return <CubeIcon />;
              default: return <InfoCircleIcon />;
            }
          };

          return (
            <StackItem key={resource}>
              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                <FlexItem>
                  {getIcon(resource)}
                </FlexItem>
                <FlexItem flex={{ default: 'flex_1' }}>
                  <div style={{ marginBottom: '4px' }}>
                    <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
                      <FlexItem>
                        <span style={{ textTransform: 'capitalize' }}>
                          {resource}
                        </span>
                      </FlexItem>
                      <FlexItem>
                        <small>{data.used} / {data.total} {data.unit}</small>
                      </FlexItem>
                    </Flex>
                  </div>
                  <Progress
                    value={percentage}
                    variant={percentage > 80 ? 'danger' : percentage > 60 ? 'warning' : 'success'}
                    size="sm"
                  />
                </FlexItem>
                <FlexItem>
                  <strong>{percentage}%</strong>
                </FlexItem>
              </Flex>
            </StackItem>
          );
        })}
      </Stack>
    </CardBody>
  </Card>
);

export const WorkloadsOverviewCard: React.FunctionComponent = () => (
  <Card className="glass-card">
    <CardTitle>Workloads Overview</CardTitle>
    <CardBody>
      <Grid hasGutter>
        {Object.entries(clusterData.workloads).map(([workload, count]) => {
          const getIcon = (wl: string) => {
            switch (wl) {
              case 'namespaces': return <CubesIcon />;
              case 'pods': return <CubeIcon />;
              case 'services': return <NetworkIcon />;
              case 'deployments': return <ServerIcon />;
              default: return <InfoCircleIcon />;
            }
          };

          return (
            <GridItem key={workload} span={6} sm={4} md={3}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '8px' }}>
                  {getIcon(workload)}
                </div>
                <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                  {count}
                </div>
                <div>
                  <small>{workload.replace(/([A-Z])/g, ' $1').trim()}</small>
                </div>
              </div>
            </GridItem>
          );
        })}
      </Grid>
    </CardBody>
    <CardFooter>
      <PrimaryButton size="sm">
        View All Workloads
      </PrimaryButton>
    </CardFooter>
  </Card>
);

export const ClusterAlertsCard: React.FunctionComponent = () => (
  <Card className="glass-card">
    <CardTitle>Cluster Alerts</CardTitle>
    <CardBody>
      <AlertGroup>
        {clusterData.alerts.map((alert, index) => (
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
      <SecondaryButton size="sm">
        View All Alerts
      </SecondaryButton>
    </CardFooter>
  </Card>
);

export const RecentEventsCard: React.FunctionComponent = () => (
  <Card className="glass-card">
    <CardTitle>Recent Events</CardTitle>
    <CardBody>
      <List isPlain>
        {clusterData.recentEvents.map((event, index) => (
          <ListItem key={index}>
            <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
              <FlexItem>
                {event.status === 'success' && <CheckCircleIcon color="green" />}
                {event.status === 'warning' && <ExclamationTriangleIcon color="warning" />}
                {event.status === 'info' && <InfoCircleIcon color="blue" />}
                {event.status === 'error' && <TimesCircleIcon color="red" />}
              </FlexItem>
              <FlexItem flex={{ default: 'flex_1' }}>
                {event.event}
              </FlexItem>
              <FlexItem>
                <small>{event.time}</small>
              </FlexItem>
            </Flex>
            {index < clusterData.recentEvents.length - 1 && (
              <Divider style={{ margin: '8px 0' }} />
            )}
          </ListItem>
        ))}
      </List>
    </CardBody>
    <CardFooter>
      <SecondaryButton size="sm">
        View Event Log
      </SecondaryButton>
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
            Scale Workload
          </SecondaryButton>
        </GridItem>
        <GridItem span={6}>
          <SecondaryButton isFullWidth>
            View Logs
          </SecondaryButton>
        </GridItem>
        <GridItem span={6}>
          <SecondaryButton isFullWidth>
            Cluster Settings
          </SecondaryButton>
        </GridItem>
      </Grid>
    </CardBody>
  </Card>
);

export const ClusterPerformanceCard: React.FunctionComponent = () => {
  const performanceMetrics = {
    networkThroughput: { value: 1.2, unit: 'GB/s', trend: 'up', change: '+5%' },
    diskIOPS: { value: 3450, unit: 'IOPS', trend: 'up', change: '+12%' },
    avgResponseTime: { value: 245, unit: 'ms', trend: 'down', change: '-8%' },
    errorRate: { value: 0.02, unit: '%', trend: 'down', change: '-15%' },
    activeConnections: { value: 1847, unit: 'connections', trend: 'up', change: '+3%' },
    cacheHitRatio: { value: 94.5, unit: '%', trend: 'up', change: '+2%' }
  };

  const getMetricIcon = (trend: string) => {
    return trend === 'up' ? <TrendUpIcon /> : <TrendDownIcon />;
  };

  return (
    <Card className="glass-card">
      <CardTitle>
        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
          <FlexItem>
            <TrendUpIcon />
          </FlexItem>
          <FlexItem>
            Performance Metrics
          </FlexItem>
        </Flex>
      </CardTitle>
      <CardBody>
        <Grid hasGutter>
          {Object.entries(performanceMetrics).map(([metric, data]) => (
            <GridItem key={metric} lg={4} md={6} sm={12}>
              <Stack hasGutter>
                <StackItem>
                  <small style={{ textTransform: 'uppercase' }}>
                    {metric.replace(/([A-Z])/g, ' $1').trim()}
                  </small>
                </StackItem>
                <StackItem>
                  <Flex alignItems={{ default: 'alignItemsCenter' }} justifyContent={{ default: 'justifyContentSpaceBetween' }}>
                    <FlexItem>
                      <div style={{ fontSize: '18px', fontWeight: '700' }}>
                        {data.value} <small>{data.unit}</small>
                      </div>
                    </FlexItem>
                    <FlexItem>
                      <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapXs' }}>
                        <FlexItem>
                          {getMetricIcon(data.trend)}
                        </FlexItem>
                        <FlexItem>
                          <small>{data.change}</small>
                        </FlexItem>
                      </Flex>
                    </FlexItem>
                  </Flex>
                </StackItem>
              </Stack>
            </GridItem>
          ))}
        </Grid>
      </CardBody>
      <CardFooter>
        <SecondaryButton size="sm">
          View Detailed Analytics
        </SecondaryButton>
      </CardFooter>
    </Card>
  );
};

export const WelcomeUserCard: React.FunctionComponent<{ userName?: string }> = ({ userName }) => (
  <WelcomeCard userName={userName} clusterData={clusterData} />
);

export { clusterData }; 