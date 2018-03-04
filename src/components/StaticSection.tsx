import * as React from 'react';
import { IStaticLinks, IStaticLinkHeading, INavigationItem } from '../interfaces';
import styles from '../extensions/itaMegaMenu/AppCustomizer.module.scss';
export interface StaticSectionProps {
    items:IStaticLinkHeading,
    index:number
};

export interface StaticSectionState {};

export default class StaticSection extends React.Component<StaticSectionProps, StaticSectionState> {
    public render(): JSX.Element {
        var bgColor="#004578";
        switch (this.props.index)
        {
        case 0 : bgColor =  "#ee4035";
        break;
        case 1 : bgColor = "#f37736"
        break;
        case 2 : bgColor = "#7bc043"
        break;
        default : bgColor =  "ee4035"
        }

        return (<div className={styles.staticsection} style={{backgroundColor:bgColor, width:(window as any).navBoxWidth+"px"}}>
            <h3>{this.props.items.title}</h3>
            <div>
            {this.props.items.links.map((link,index)=>{
                return <div>
                    <a href={link.link}>{link.title}</a>
                </div>
            })}
            </div>
        </div>);
    }
}
