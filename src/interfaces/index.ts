export interface INavigation
{
    navigation:INavigationItem[]
}
export interface INavigationItem
{
    title:string,
    link:string,
    description:string,
    target:string,
    visible:boolean,
    children?:INavigationItem[]
}