import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { AspectRatio } from './aspect-ratio';
import Image from 'next/image';

const Story: ComponentMeta<typeof AspectRatio> = {
  component: AspectRatio,
  title: 'AspectRatio',
};

export default Story;

const Template: ComponentStory<typeof AspectRatio> = (args) => (
  <div className="w-[450px]">
    <AspectRatio {...args} className="bg-slate-50 dark:bg-slate-800">
      <Image
        src="https://images.unsplash.com/photo-1576075796033-848c2a5f3696?w=800&dpr=2&q=80"
        alt="Photo by Alvaro Pinot"
        fill
        className="rounded-md object-cover"
      />
    </AspectRatio>
  </div>
);

export const Overview = Template.bind({});

Overview.args = {
  ratio: 16 / 9,
};
