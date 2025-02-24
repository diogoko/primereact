import { ObjectUtils } from '../utils/Utils';

export const PickListBase = {
    defaultProps: {
        __TYPE: 'PickList',
        id: null,
        source: null,
        target: null,
        sourceHeader: null,
        targetHeader: null,
        style: null,
        className: null,
        sourceStyle: null,
        targetStyle: null,
        sourceSelection: null,
        targetSelection: null,
        showSourceControls: true,
        showTargetControls: true,
        metaKeySelection: true,
        filter: false,
        filterBy: null,
        filterMatchMode: 'contains',
        targetFilterIcon: null,
        sourceFilterIcon: null,
        moveAllToSourceIcon: null,
        moveToSourceIcon: null,
        moveAllToTargetIcon: null,
        moveToTargetIcon: null,
        moveBottomIcon: null,
        moveUpIcon: null,
        moveTopIcon: null,
        moveDownIcon: null,
        filterLocale: undefined,
        sourceFilterValue: null,
        targetFilterValue: null,
        showSourceFilter: true,
        showTargetFilter: true,
        sourceFilterPlaceholder: null,
        targetFilterPlaceholder: null,
        sourceFilterTemplate: null,
        targetFilterTemplate: null,
        tabIndex: 0,
        dataKey: null,
        breakpoint: '960px',
        itemTemplate: null,
        sourceItemTemplate: null,
        targetItemTemplate: null,
        onChange: null,
        onMoveToSource: null,
        onMoveAllToSource: null,
        onMoveToTarget: null,
        onMoveAllToTarget: null,
        onSourceSelectionChange: null,
        onTargetSelectionChange: null,
        onSourceFilterChange: null,
        onTargetFilterChange: null,
        children: undefined
    },
    getProps: (props) => ObjectUtils.getMergedProps(props, PickListBase.defaultProps),
    getOtherProps: (props) => ObjectUtils.getDiffProps(props, PickListBase.defaultProps)
};
