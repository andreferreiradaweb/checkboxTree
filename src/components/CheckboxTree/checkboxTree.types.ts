export type TreeNode = {
  id: string;
  name: string;
  children?: TreeNode[];
  level: number;
};

export type CheckBoxTreeProps = {
  tree: TreeNode[];
};

export type Node = {
  id: string;
  state: NodeState;
  parentId: string | null;
  hasChildren: boolean;
};

export enum NodeState {
  CHECKED = "CHECKED",
  UNCHECKED = "UNCHECKED",
  INDETERMIDATE = "INDETERMIDATE"
}
