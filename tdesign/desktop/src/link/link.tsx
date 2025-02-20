import { h, tag, extractClass, WeElement, OmiProps } from 'omi'
import { LinkProps } from './type'
import parseTNode from '../utils/parseTNode'
import './style/index.js'
import css from './style/index'

@tag('t-link')
export default class Link extends WeElement<LinkProps> {
  static css = css as string

  static defaultProps = {
    underline: false,
    disabled: false,
    size: 'medium',
  }

  static propTypes = {
    content: Object,
    default: Object,
    disabled: Boolean,
    hover: String,
    href: String,
    prefixIcon: Object,
    size: String,
    suffixIcon: Object,
    target: String,
    theme: String,
    underline: Boolean,
    onClick: Function, // need to test
  }

  handleClick = (e: MouseEvent) => {
    if (this.props.disabled) return
    this.props.onClick?.(e)
  }

  render(props: OmiProps<LinkProps>) {
    const classPrefix = 't'

    // TODO: children is null
    const childNode = props.content || props.children
    const linkClass = extractClass(props, `${classPrefix}-link`, `${classPrefix}-link--theme-${props.theme}`, {
      [`${classPrefix}-size-s`]: props.size === 'small',
      [`${classPrefix}-size-l`]: props.size === 'large',
      [`${classPrefix}-is-disabled`]: !!props.disabled,
      [`${classPrefix}-is-underline`]: !!props.underline,
      [`${classPrefix}-link--hover-${props.hover}`]: !props.disabled,
    })

    return (
      <h>
        <a
          {...linkClass}
          href={props.disabled || !props.href ? undefined : props.href}
          target={props.target}
          onClick={this.handleClick}
        >
          {props.prefixIcon && <span class={`${classPrefix}-link__prefix-icon`}>{parseTNode(props.prefixIcon)}</span>}
          <slot></slot>
          {props.suffixIcon && <span class={`${classPrefix}-link__suffix-icon`}>{parseTNode(props.suffixIcon)}</span>}
        </a>
      </h>
    )
  }
}
