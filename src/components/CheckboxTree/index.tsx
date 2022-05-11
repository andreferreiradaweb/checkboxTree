import { useState } from "react";
import { Checkbox } from "../Checkbox";

import {
  CheckBoxTreeProps,
  Node,
  TreeNode,
  NodeState
} from "./checkboxTree.types";

const getTreeNodes = (tree: TreeNode[]) => {
  const nodes: Node[] = [];

  const getNodes = (data: TreeNode[], parentId: string | null = null) => {
    data.forEach(({ id, children }) => {
      nodes.push({
        id,
        state: NodeState.UNCHECKED,
        parentId,
        hasChildren: !!children
      });

      if (children) {
        getNodes(children, id);
      }
    });
  };

  getNodes(tree);

  return nodes;
};

export const CheckboxTree = ({ tree }: CheckBoxTreeProps) => {
  const [nodes, setNodes] = useState(getTreeNodes(tree));

  const changeNodeStateById = (
    nodeId: string,
    newNodeState: NodeState,
    oldNodes = nodes
  ) => {
    const nodeIndex = oldNodes.findIndex(({ id }) => id === nodeId);

    if (nodeIndex < 0) throw new Error("Node not found");

    const newNodes = [...oldNodes];

    return newNodes.fill(
      { ...newNodes[nodeIndex], state: newNodeState },
      nodeIndex,
      nodeIndex + 1
    );
  };

  const getNodeById = (id: string, allNodes = nodes) => {
    const node = allNodes.find((node) => node.id === id);

    if (!node) throw new Error("Node not found");

    return node;
  };

  const updateNodeAndChildrenState = (
    node: Node,
    newState: NodeState,
    oldNodes = nodes
  ) => {
    let newNodes = [...oldNodes];

    const updateChildren = ({ id, hasChildren }: Node) => {
      newNodes = changeNodeStateById(id, newState, newNodes);

      if (hasChildren) {
        const children = newNodes.filter(({ parentId }) => parentId === id);

        children.forEach((child) => updateChildren(child));
      }
    };

    updateChildren(node);

    return newNodes;
  };

  const updateNodeParentsById = (id: string, oldNodes: Node[]) => {
    let newNodes = [...oldNodes];
    let parentId = getNodeById(id, newNodes).parentId;

    while (parentId) {
      const node = getNodeById(parentId, newNodes);

      const children = newNodes.filter((child) => child.parentId === node.id);

      const [allChecked, allUnchecked] = [
        children.every((child) => child.state === NodeState.CHECKED),
        children.every((child) => child.state === NodeState.UNCHECKED)
      ];

      const isIndeterminate = !allChecked && !allUnchecked;

      let newState = NodeState.UNCHECKED;

      if (allChecked) newState = NodeState.CHECKED;

      if (isIndeterminate) newState = NodeState.INDETERMIDATE;

      newNodes = changeNodeStateById(node.id, NodeState[newState], newNodes);

      parentId = node.parentId;
    }

    return newNodes;
  };

  const updateNodeStateById = (id: string) => {
    const node = getNodeById(id);

    const newNodeState =
      node.state === NodeState.CHECKED
        ? NodeState.UNCHECKED
        : NodeState.CHECKED;

    const newNodes = updateNodeAndChildrenState(node, newNodeState);

    return updateNodeParentsById(node.id, newNodes);
  };

  const clickNodeHandler = (nodeId: string) => {
    setNodes(updateNodeStateById(nodeId));
  };

  const renderTree = (treeToRender: TreeNode[]) => (
    <ul>
      {treeToRender.map(({ id, name, children }) => {

        const { state } = getNodeById(id)

        return (
          <details key={id}>
            <summary>
              <Checkbox
                label={name}
                onClick={() => clickNodeHandler(id)}
                isChecked={state === NodeState.CHECKED}
                isIndeterminate={state === NodeState.INDETERMIDATE}
              />
            </summary>

            {children && renderTree(children)}
          </details>
        )
      })}
    </ul>
  );

  return renderTree(tree);
};
