import type { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

const Story: ComponentMeta<typeof Accordion> = {
  component: Accordion,
  title: 'Accordion',
};

export default Story;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} className="w-[450px]">
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is it styled?</AccordionTrigger>
      <AccordionContent>
        Yes. It comes with default styles that matches the other components'
        aesthetic.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Is it animated?</AccordionTrigger>
      <AccordionContent>
        Yes. It's animated by default, but you can disable it if you prefer.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const Overview = Template.bind({});

Overview.args = {
  type: 'single',
  collapsible: true,
};