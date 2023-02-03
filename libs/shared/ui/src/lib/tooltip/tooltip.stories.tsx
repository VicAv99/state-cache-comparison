import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Plus } from 'lucide-react';
import { Button } from '../button/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const Story: ComponentMeta<typeof Tooltip> = {
  component: Tooltip,
  title: 'Tooltip',
};

export default Story;

const Template: ComponentStory<typeof Tooltip> = (args) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="w-10 rounded-full p-0">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const Overview = Template.bind({});

Overview.args = {
  asChild: true,
};
