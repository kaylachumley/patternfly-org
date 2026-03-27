import * as React from 'react';
import {
  ClusterOverviewCard,
  ResourceUtilizationCard,
  WorkloadsOverviewCard,
  ClusterAlertsCard,
  RecentEventsCard,
  QuickActionsCard,
  ClusterPerformanceCard,
  WelcomeUserCard
} from './OpenShiftClusterComponents';
import { OpenShiftUpdatesCard } from './DashboardComponents';

export interface WidgetConfig {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<any>;
  defaultProps?: Record<string, any>;
  category: 'overview' | 'performance' | 'workloads' | 'alerts' | 'actions' | 'updates';
  defaultSize?: 'small' | 'medium' | 'large' | 'full';
}

export const AVAILABLE_WIDGETS: WidgetConfig[] = [
  {
    id: 'welcome',
    name: 'Welcome Card',
    description: 'Personalized welcome message',
    component: WelcomeUserCard,
    defaultProps: { userName: 'Administrator' },
    category: 'overview',
    defaultSize: 'full'
  },
  {
    id: 'cluster-overview',
    name: 'Cluster Overview',
    description: 'Overview of cluster status and information',
    component: ClusterOverviewCard,
    category: 'overview',
    defaultSize: 'small'
  },
  {
    id: 'resource-utilization',
    name: 'Resource Utilization',
    description: 'CPU, memory, storage, and pod usage metrics',
    component: ResourceUtilizationCard,
    category: 'performance',
    defaultSize: 'small'
  },
  {
    id: 'workloads-overview',
    name: 'Workloads Overview',
    description: 'Summary of namespaces, pods, services, and deployments',
    component: WorkloadsOverviewCard,
    category: 'workloads',
    defaultSize: 'small'
  },
  {
    id: 'cluster-performance',
    name: 'Performance Metrics',
    description: 'Network, disk, response time, and other performance metrics',
    component: ClusterPerformanceCard,
    category: 'performance',
    defaultSize: 'full'
  },
  {
    id: 'cluster-alerts',
    name: 'Cluster Alerts',
    description: 'Important cluster alerts and warnings',
    component: ClusterAlertsCard,
    category: 'alerts',
    defaultSize: 'small'
  },
  {
    id: 'recent-events',
    name: 'Recent Events',
    description: 'Recent cluster events and activities',
    component: RecentEventsCard,
    category: 'alerts',
    defaultSize: 'small'
  },
  {
    id: 'quick-actions',
    name: 'Quick Actions',
    description: 'Common cluster management actions',
    component: QuickActionsCard,
    category: 'actions',
    defaultSize: 'small'
  },
  {
    id: 'openshift-updates',
    name: 'OpenShift Updates',
    description: 'Available OpenShift version updates',
    component: OpenShiftUpdatesCard,
    category: 'updates',
    defaultSize: 'full'
  }
];

export const getWidgetById = (id: string): WidgetConfig | undefined => {
  return AVAILABLE_WIDGETS.find(widget => widget.id === id);
};

export const getWidgetsByCategory = (category: WidgetConfig['category']): WidgetConfig[] => {
  return AVAILABLE_WIDGETS.filter(widget => widget.category === category);
};
