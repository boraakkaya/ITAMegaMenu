import * as React from 'react';
import { IStaticLinks } from '../interfaces';
import StaticSection from './StaticSection';
import styles from '../extensions/itaMegaMenu/AppCustomizer.module.scss';
export interface StaticSectionBoxProps {
    items:IStaticLinks[]
};
export interface StaticSectionBoxState {};

export class StaticSectionBox extends React.Component<StaticSectionBoxProps, StaticSectionBoxState> {
    public render(): JSX.Element {        
        return (<div className={styles.staticsectionbox} style={{left:((window as any).navBoxWidth *1) + "px"}}>
            {this.props.items[0].headings.map((item,index)=>{
                return <StaticSection items={item} index={index} />
            })}
        </div>);
    }
}
