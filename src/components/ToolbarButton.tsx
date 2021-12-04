import React from 'react';

export const ToolbarButton = ({
  onClick,
  icon,
  children,
  ...props
}: {
  onClick: () => void;
  icon?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  console.log(children);
  return (
    <button
      type="button"
      style={{
        background: 'none',
      }}
      onClick={onClick}
      {...props}
    >
      {icon && <img src={icon} alt="icon" />}
      {children}
    </button>
  );
};

ToolbarButton.defaultProps = {
  icon: undefined,
  children: undefined,
};
