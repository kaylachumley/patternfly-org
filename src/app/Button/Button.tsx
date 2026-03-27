import * as React from 'react';
import { Button as PFButton, ButtonProps } from '@patternfly/react-core';

export interface CustomButtonProps extends Omit<ButtonProps, 'children'> {
  children: React.ReactNode;
  /** Additional custom styling */
  isFullWidth?: boolean;
  /** Loading state */
  isLoading?: boolean;
}

export const Button: React.FunctionComponent<CustomButtonProps> = ({
  children,
  isFullWidth = false,
  isLoading = false,
  isDisabled,
  ...props
}) => {
  return (
    <PFButton
      {...props}
      isDisabled={isDisabled || isLoading}
      style={{
        ...(isFullWidth && { width: '100%' }),
        ...props.style
      }}
    >
      {isLoading ? 'Loading...' : children}
    </PFButton>
  );
};

// Pre-configured button variants for common use cases
export const PrimaryButton: React.FunctionComponent<CustomButtonProps> = (props) => (
  <Button variant="primary" {...props} />
);

export const SecondaryButton: React.FunctionComponent<CustomButtonProps> = (props) => (
  <Button variant="secondary" {...props} />
);

export const DangerButton: React.FunctionComponent<CustomButtonProps> = (props) => (
  <Button variant="danger" {...props} />
);

export const LinkButton: React.FunctionComponent<CustomButtonProps> = (props) => (
  <Button variant="link" {...props} />
);

export const PlainButton: React.FunctionComponent<CustomButtonProps> = (props) => (
  <Button variant="plain" {...props} />
); 