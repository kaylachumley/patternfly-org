import * as React from 'react';
import {
  Chatbot,
  ChatbotContent,
  ChatbotWelcomePrompt,
  ChatbotFooter,
  MessageBar,
  Message,
  MessageBox
} from '@patternfly/chatbot';
import {
  Button,
  Modal,
  ModalVariant
} from '@patternfly/react-core';
import {
  CommentIcon,
  TimesIcon,
  RobotIcon
} from '@patternfly/react-icons';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: Date;
}

export const OpenShiftChatBot: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = React.useState('');

  // Sample welcome message and responses
  const welcomePrompts = [
    'How can I scale my deployment?',
    'Show me cluster resource usage',
    'What are the current alerts?',
    'Help me troubleshoot a pod issue'
  ];

  const botResponses = {
    scale: 'To scale your deployment, you can use the `oc scale` command or navigate to the Workloads section in the console. For example: `oc scale deployment/my-app --replicas=3`',
    resources: 'Your cluster is currently using 68% CPU and 55% memory. You can view detailed metrics in the Resource Utilization card above.',
    alerts: 'There are currently 2 active alerts: High Memory Usage on worker-03 and Node worker-05 is NotReady. Check the Cluster Alerts section for more details.',
    troubleshoot: 'For pod troubleshooting, start by checking pod logs with `oc logs <pod-name>` and pod events with `oc describe pod <pod-name>`. Common issues include image pull errors, resource limits, and configuration problems.',
    default: 'I can help you with OpenShift cluster management, scaling workloads, troubleshooting issues, and monitoring resources. What would you like to know?'
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: message,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      let response = botResponses.default;
      
      if (message.toLowerCase().includes('scale')) {
        response = botResponses.scale;
      } else if (message.toLowerCase().includes('resource') || message.toLowerCase().includes('usage')) {
        response = botResponses.resources;
      } else if (message.toLowerCase().includes('alert')) {
        response = botResponses.alerts;
      } else if (message.toLowerCase().includes('troubleshoot') || message.toLowerCase().includes('pod') || message.toLowerCase().includes('error')) {
        response = botResponses.troubleshoot;
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        content: response,
        role: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setCurrentMessage('');
  };

  const handleWelcomePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        variant="primary"
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          zIndex: 1000,
          background: '#0066CC',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)'
        }}
        aria-label="Open OpenShift Assistant"
      >
        <CommentIcon />
      </Button>

      {/* Chat Modal */}
      <Modal
        variant={ModalVariant.medium}
        title="OpenShift Assistant"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}

        actions={[
          <Button
            key="close"
            variant="plain"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <TimesIcon />
          </Button>
        ]}
        style={{ height: '600px' }}
      >
        <Chatbot>
          <ChatbotContent style={{ height: '500px', overflowY: 'auto' }}>
            {messages.length === 0 ? (
              <ChatbotWelcomePrompt
                title="Hello! I'm your OpenShift Assistant"
                description="I can help you manage your cluster, troubleshoot issues, and answer questions about your workloads."
                prompts={welcomePrompts.map((prompt, index) => ({
                  title: prompt,
                  onClick: () => handleWelcomePromptClick(prompt)
                }))}
              />
            ) : (
              <MessageBox>
                {messages.map((msg) => (
                  <Message
                    key={msg.id}
                    role={msg.role}
                    content={msg.content}
                    timestamp={msg.timestamp.toLocaleTimeString()}
                    avatar={msg.role === 'bot' ? 'bot-avatar' : 'user-avatar'}
                  />
                ))}
              </MessageBox>
            )}
          </ChatbotContent>
          <ChatbotFooter>
            <MessageBar
              value={currentMessage}
              onChange={(event, value) => setCurrentMessage(value as string)}
              onSendMessage={(message) => handleSendMessage(message as string)}
              placeholder="Ask me about your OpenShift cluster..."
              hasAttachButton={false}
              hasMicrophoneButton={false}
            />
          </ChatbotFooter>
        </Chatbot>
      </Modal>
    </>
  );
};

export default OpenShiftChatBot;
