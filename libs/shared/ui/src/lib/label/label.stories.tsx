import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from '../checkbox/checkbox';
import { Label } from './label';

const Story: ComponentMeta<typeof Label> = {
  component: Label,
  title: 'Label',
};

export default Story;

const Template: ComponentStory<typeof Label> = (args) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
};

export const Overview = Template.bind({});

Overview.args = {
  asChild: true,
};
