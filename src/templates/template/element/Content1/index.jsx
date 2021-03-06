import React, { PropTypes } from 'react';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import './index.less';

const BgElement = Element.BgElement;
class Banner extends React.Component {
  componentWillReceiveProps(nextProps) {
    const dataSource = nextProps.dataSource;
    const names = nextProps.id.split('_');
    const name = `${names[0]}${names[1]}`;
    const func = dataSource[name].func;
    if (func && this.banner) {
      this.banner.slickGoTo(func.page - 1);
    }
  }

  render() {
    const props = { ...this.props };
    const dataSource = this.props.dataSource;
    const names = this.props.id.split('_');
    const name = `${names[0]}${names[1]}`;
    delete props.dataSource;
    delete props.isMode;
    const childrenData = [];
    Object.keys(dataSource).filter(key => key.match('Block')).forEach((key) => {
      const keys = key.split('Block');
      const i = keys[1];
      const t = childrenData[i] = childrenData[i] || {};
      t[key] = dataSource[key];
    });
    const childrenToRender = childrenData.map((item, i) => {
      const title = item[`${name}_titleBlock${i}`];
      const content = item[`${name}_contentBlock${i}`];
      const button = item[`${name}_buttonBlock${i}`];
      const isImg = title.children
        .match(/\.(gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/);
      return (<Element
        key={i}
        prefixCls="banner-user-elem"
      >
        <BgElement
          className={`bg bg${i}`}
          key="bg"
        />
        <QueueAnim
          type={['bottom', 'top']} delay={200}
          className={`${props.className}-title`}
          key="text"
          id={`${props.id}-wrapperBlock${i}`}
        >
          <span
            className="logo"
            key="logo"
            id={`${props.id}-titleBlock${i}`}
          >
            {isImg ?
              (<img width="100%" src={title.children} />) :
              title.children}
          </span>
          <p
            key="content"
            id={`${props.id}-contentBlock${i}`}
          >
            {content.children}
          </p>
          <Button
            type="ghost"
            key="button"
            id={`${props.id}-buttonBlock${i}`}
          >
            {button.children}
          </Button>
        </QueueAnim>
      </Element>);
    });
    return (
      <OverPack
        {...props}
        hideProps={{ icon: { reverse: true } }}
      >
        <TweenOneGroup
          key="banner"
          enter={{ opacity: 0, type: 'from' }}
          leave={{ opacity: 0 }}
          component=""
        >
          <BannerAnim
            key="banner"
            ref={(c) => {
              this.banner = c;
            }}
          >
            {childrenToRender}
          </BannerAnim>
        </TweenOneGroup>
        <TweenOne
          animation={{ y: '-=20', yoyo: true, repeat: -1, duration: 1000 }}
          className={`${this.props.className}-icon`}
          style={{ bottom: 40 }}
          key="icon"
        >
          <Icon type="down" />
        </TweenOne>
      </OverPack>
    );
  }
}

Banner.propTypes = {
  className: PropTypes.string,
  dataSource: PropTypes.object,
  id: PropTypes.string,
};

Banner.defaultProps = {
  className: 'banner1',
};

export default Banner;
