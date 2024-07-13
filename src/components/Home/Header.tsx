import { Button } from '@relume_io/relume-ui'
import type { ButtonProps } from '@relume_io/relume-ui'

type ImageProps = {
  src: string
  alt?: string
}

type Props = {
  heading: string
  description: string
  buttons: ButtonProps[]
  image: ImageProps
}

export type Header5Props = React.ComponentPropsWithoutRef<'section'> &
  Partial<Props>

const Header = (props: Header5Props) => {
  const { heading, description, buttons, image } = {
    ...Header5Defaults,
    ...props,
  } as Props
  return (
    <header className="relative flex flex-col px-[5%]">
      <div className="container flex flex-1 flex-col">
        <div className="flex max-h-[60rem] min-h-[93.5vh] flex-1 flex-grow items-center py-16 md:py-24">
          <div className="max-w-md">
            <h1 className="text-text-alternative mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-6xl">
              {heading}
            </h1>
            <p className="text-text-alternative md:text-md text-base">
              {description}
            </p>
            <div className="mt-6 flex gap-x-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <img
          src={image.src}
          className="size-full object-cover"
          alt={image.alt}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </header>
  )
}

export const Header5Defaults: Header5Props = {
  heading: 'Medium length hero heading goes here',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
  buttons: [{ title: 'Button' }, { title: 'Button', variant: 'secondary-alt' }],
  image: {
    src: 'https://relume-assets.s3.amazonaws.com/placeholder-image.svg',
    alt: 'Placeholder image',
  },
}

Header.displayName = 'Header'

export default Header
