import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from './checkbox';

const Story: ComponentMeta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Checkbox',
};

export default Story;

const Template: ComponentStory<typeof Checkbox> = (args) => {
  return <Checkbox {...args} />;
};

export const Overview = Template.bind({});

Overview.args = {
  asChild: false,
};
