'use client'

import { useState } from 'react'
import { Button, useMediaQuery } from '@relume_io/relume-ui'
import type { ButtonProps } from '@relume_io/relume-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { RxChevronDown } from 'react-icons/rx'

type ImageProps = {
  url?: string
  src: string
  alt?: string
}

type NavLink = {
  url: string
  title: string
  subMenuLinks?: NavLink[]
}

type Props = {
  logo: ImageProps
  navLinks: NavLink[]
  buttons: ButtonProps[]
}

export type Navbar1Props = React.ComponentPropsWithoutRef<'section'> &
  Partial<Props>

export const Navbar = (props: Navbar1Props) => {
  const { logo, navLinks, buttons } = {
    ...Navbar1Defaults,
    ...props,
  } as Props

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 991px)')

  return (
    <nav className="border-border-primary lg:min-h-18 flex w-full items-center border-b bg-foreground text-background lg:px-[5%]">
      <div className="container size-full lg:flex lg:items-center lg:justify-between">
        <div className="md:min-h-18 flex min-h-16 items-center justify-between px-[5%] md:justify-start lg:min-h-full lg:px-0">
          <a href={logo.url}>
            {/* <img src={logo.src} alt={logo.alt} /> */}
            Logo
          </a>
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-background"
              animate={isMobileMenuOpen ? ['open', 'rotatePhase'] : 'closed'}
              variants={topLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-background"
              animate={isMobileMenuOpen ? 'open' : 'closed'}
              variants={middleLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-background"
              animate={isMobileMenuOpen ? ['open', 'rotatePhase'] : 'closed'}
              variants={bottomLineVariants}
            />
          </button>
        </div>
        <motion.div
          variants={{
            open: {
              height: 'var(--height-open, 100dvh)',
            },
            close: {
              height: 'var(--height-closed, 0)',
            },
          }}
          initial="close"
          exit="close"
          animate={isMobileMenuOpen ? 'open' : 'close'}
          transition={{ duration: 0.4 }}
          className="overflow-hidden px-[5%] md:py-2 lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          {navLinks.map((navLink, index) => (
            <div key={index} className="first:pt-4 lg:first:pt-0">
              {navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
                <SubMenu navLink={navLink} isMobile={isMobile} />
              ) : (
                <a
                  href={navLink.url}
                  className="text-md block py-3 focus-visible:outline-none lg:px-4 lg:py-2 lg:text-base"
                >
                  {navLink.title}
                </a>
              )}
            </div>
          ))}
          <div className="mt-6 flex flex-col items-center gap-4 lg:ml-4 lg:mt-0 lg:flex-row">
            {buttons.map((button, index) => (
              <Button key={index} {...button} className="w-full">
                {button.title}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  )
}

const SubMenu = ({
  navLink,
  isMobile,
}: {
  navLink: NavLink
  isMobile: boolean
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className="text-md flex w-full items-center justify-between gap-2 py-3 text-left focus-visible:outline-none lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>{navLink.title}</span>
        <motion.span
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          animate={isDropdownOpen ? 'rotated' : 'initial'}
          transition={{ duration: 0.3 }}
        >
          <RxChevronDown />
        </motion.span>
      </button>
      {isDropdownOpen && (
        <AnimatePresence>
          <motion.nav
            variants={{
              open: {
                visibility: 'visible',
                opacity: 'var(--opacity-open, 100%)',
                y: 0,
              },
              close: {
                visibility: 'hidden',
                opacity: 'var(--opacity-close, 0)',
                y: 'var(--y-close, 0%)',
              },
            }}
            animate={isDropdownOpen ? 'open' : 'close'}
            initial="close"
            exit="close"
            transition={{ duration: 0.2 }}
            className="lg:border-border-primary bg-foreground lg:absolute lg:z-50 lg:border lg:p-2 lg:[--y-close:25%]"
          >
            {navLink.subMenuLinks?.map((navLink, index) => (
              <a
                key={index}
                href={navLink.url}
                className="text-md block py-3 pl-[5%] hover:bg-accent-foreground focus-visible:outline-none lg:px-4 lg:py-2 lg:text-base"
              >
                {navLink.title}
              </a>
            ))}
          </motion.nav>
        </AnimatePresence>
      )}
    </div>
  )
}

export const Navbar1Defaults: Navbar1Props = {
  logo: {
    url: '#',
    src: 'https://relume-assets.s3.amazonaws.com/logo-image.svg',
    alt: 'Logo image',
  },
  navLinks: [
    { title: 'Link One', url: '#' },
    { title: 'Link Two', url: '#' },
    { title: 'Link Three', url: '#' },
    {
      title: 'Link Four',
      url: '#',
      subMenuLinks: [
        { title: 'Link Five', url: '#' },
        { title: 'Link Six', url: '#' },
        { title: 'Link Seven', url: '#' },
      ],
    },
  ],
  buttons: [
    {
      title: 'Button',
      variant: 'secondary',
      size: 'sm',
    },
    {
      title: 'Button',
      size: 'sm',
    },
  ],
}

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
}

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: '1.5rem',
    transition: { delay: 0.3, duration: 0.2 },
  },
}

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
}

Navbar.displayName = 'Navbar'
