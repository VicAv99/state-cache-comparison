import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Progress } from './progress';

const Story: ComponentMeta<typeof Progress> = {
  component: Progress,
  title: 'Progress',
};

export default Story;

const Template: ComponentStory<typeof Progress> = (args) => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} />;
};

export const Overview = Template.bind({});

Overview.args = {
  asChild: true,
};
