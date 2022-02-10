import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart';
import Collapsible from 'react-collapsible';
const StyledNode = ({ children }) => {
    //TODO For more styling write code here according to requirement.
    return (
        <div className='text-center d-inline-flex'>
           <div  style={styles}>{ children}</div>
        </div>
    )
}
const MainTree = () => {
    return (

       
        <Tree
            lineWidth={'2px'}
            lineColor={'rgba(255,255,255,0.5)'}
            lineBorderRadius={'10px'}
            label={<StyledNode>Root</StyledNode>}
        >
            <TreeNode label={<StyledNode>Child 1</StyledNode>}>
                {/* <TreeNode label={<StyledNode>Grand Child</StyledNode>} /> */}
            </TreeNode>
            <TreeNode label={<StyledNode>Child 2</StyledNode>}>
                {/* <TreeNode label={<StyledNode>Grand Child</StyledNode>}>
                    <TreeNode label={<StyledNode>Great Grand Child 1</StyledNode>} />
                    <TreeNode label={<StyledNode>Great Grand Child 2</StyledNode>} />
                </TreeNode> */}
            </TreeNode>
            <TreeNode label={<StyledNode>Child 3</StyledNode>}>
                {/* <TreeNode label={<StyledNode>Grand Child 1</StyledNode>} />
                <TreeNode label={<StyledNode>Grand Child 2</StyledNode>} /> */}
            </TreeNode>
        </Tree>
       
    )
}

export default MainTree

const styles = {
    background: 'rgba(255,255,255,0.5)',
    height: 60,
    borderRadius: 10,
    color: '#000',
    width:200,
}

