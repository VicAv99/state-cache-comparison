import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const Story: ComponentMeta<typeof Avatar> = {
  component: Avatar,
  title: 'Avatar',
};

export default Story;

const Template: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args}>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
);

export const Overview = Template.bind({});

Overview.args = {
  asChild: false,
};
