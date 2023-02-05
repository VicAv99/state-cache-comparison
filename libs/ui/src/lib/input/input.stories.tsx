import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './input';

const Story: ComponentMeta<typeof Input> = {
  component: Input,
  title: 'Input',
};

export default Story;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Overview = Template.bind({});

Overview.args = {
  type: 'email',
  placeholder: 'Email',
};
