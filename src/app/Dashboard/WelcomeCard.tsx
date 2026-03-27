import * as React from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  Badge,
  Flex,
  FlexItem,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import {
  UserIcon,
  ClusterIcon,
  CheckCircleIcon,
  TrendUpIcon,
  CubeIcon,
  ExclamationTriangleIcon,
} from '@patternfly/react-icons';

interface WelcomeCardProps {
  userName?: string;
  clusterData: any;
}

export const WelcomeCard: React.FunctionComponent<WelcomeCardProps> = ({ 
  userName = "Administrator", 
  clusterData 
}) => {
  // Calculate summary metrics
  const totalWorkloads = Object.values(clusterData.workloads).reduce((sum: number, count: any) => sum + count, 0);
  const cpuUsage = Math.round((clusterData.resources.cpu.used / clusterData.resources.cpu.total) * 100);
  const memoryUsage = Math.round((clusterData.resources.memory.used / clusterData.resources.memory.total) * 100);
  const criticalAlerts = clusterData.alerts.filter((alert: any) => alert.type === 'danger').length;
  const healthyNodes = clusterData.nodes.ready;
  const totalNodes = clusterData.nodes.total;

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Card className="glass-card">
      <CardTitle>
        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
          <FlexItem>
            <UserIcon />
          </FlexItem>
          <FlexItem>
            {getTimeOfDay()}, {userName}!
          </FlexItem>
        </Flex>
      </CardTitle>
      
      <CardBody>
        <Stack hasGutter>
          <StackItem>
            <p>
              Here's your OpenShift cluster overview for <strong>{clusterData.cluster.name}</strong>
            </p>
          </StackItem>

          <StackItem>
            <Flex gap={{ default: 'gapMd' }} wrap={{ default: 'wrap' }}>
              {/* Cluster Health */}
              <FlexItem flex={{ default: 'flex_1' }} minWidth="150px">
                <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                  <FlexItem>
                    <CheckCircleIcon color="green" />
                  </FlexItem>
                  <FlexItem>
                    <div>
                      <small>Cluster Health</small>
                      <div><strong>{clusterData.cluster.status}</strong></div>
                    </div>
                  </FlexItem>
                </Flex>
              </FlexItem>

              {/* Nodes Status */}
              <FlexItem flex={{ default: 'flex_1' }} minWidth="150px">
                <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                  <FlexItem>
                    <ClusterIcon />
                  </FlexItem>
                  <FlexItem>
                    <div>
                      <small>Nodes Ready</small>
                      <div><strong>{healthyNodes}/{totalNodes}</strong></div>
                    </div>
                  </FlexItem>
                </Flex>
              </FlexItem>

              {/* Resource Usage */}
              <FlexItem flex={{ default: 'flex_1' }} minWidth="150px">
                <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                  <FlexItem>
                    <TrendUpIcon color={cpuUsage > 80 ? 'red' : 'warning'} />
                  </FlexItem>
                  <FlexItem>
                    <div>
                      <small>CPU Usage</small>
                      <div><strong>{cpuUsage}%</strong></div>
                    </div>
                  </FlexItem>
                </Flex>
              </FlexItem>

              {/* Workloads */}
              <FlexItem flex={{ default: 'flex_1' }} minWidth="150px">
                <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                  <FlexItem>
                    <CubeIcon />
                  </FlexItem>
                  <FlexItem>
                    <div>
                      <small>Total Workloads</small>
                      <div><strong>{totalWorkloads}</strong></div>
                    </div>
                  </FlexItem>
                </Flex>
              </FlexItem>
            </Flex>
          </StackItem>

          {/* Quick Summary */}
          <StackItem>
            <Flex alignItems={{ default: 'alignItemsCenter' }} justifyContent={{ default: 'justifyContentSpaceBetween' }}>
              <FlexItem>
                <small>Quick Summary:</small>
              </FlexItem>
              <FlexItem>
                <Flex gap={{ default: 'gapSm' }}>
                  <FlexItem>
                    <Badge isRead>{clusterData.workloads.pods} Pods</Badge>
                  </FlexItem>
                  <FlexItem>
                    <Badge isRead>{memoryUsage}% Memory</Badge>
                  </FlexItem>
                  {criticalAlerts > 0 && (
                    <FlexItem>
                      <Badge isRead>{criticalAlerts} Alert{criticalAlerts > 1 ? 's' : ''}</Badge>
                    </FlexItem>
                  )}
                </Flex>
              </FlexItem>
            </Flex>
          </StackItem>

          {/* Status Message */}
          <StackItem>
            <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
              {criticalAlerts > 0 ? (
                <ExclamationTriangleIcon color="warning" />
              ) : (
                <CheckCircleIcon color="green" />
              )}
              <small>
                {criticalAlerts > 0
                  ? `${criticalAlerts} critical alert${criticalAlerts > 1 ? 's' : ''} require${criticalAlerts === 1 ? 's' : ''} attention`
                  : `All systems operational • Uptime: ${clusterData.cluster.uptime}`
                }
              </small>
            </Flex>
          </StackItem>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default WelcomeCard; 