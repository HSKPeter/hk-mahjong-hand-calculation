import NodeForSearching from "./NodeForSearching";

class QueueFrontier {
    public frontier: NodeForSearching[];

    constructor() {
        this.frontier = [];
    }

    // 新增 NodeForSearching 入 ExplorerOfWinningPermutations
    add(node: NodeForSearching) {
        this.frontier.push(node);
    }

    // 睇吓 ExplorerOfWinningPermutations 有無包含邊啲 NodeForSearching
    contain(node: NodeForSearching): Boolean {
        for (const nodeInFrontier of this.frontier) {
            if (nodeInFrontier.isIdentical(node)) {
                return true;
            }
        }
        return false;
    }

    // 睇吓 ExplorerOfWinningPermutations 係唔係已經被清空
    empty(): Boolean {
        return this.frontier.length === 0;
    }

    // 將 ExplorerOfWinningPermutations 嘅第一個 NodeForSearching return 出去, 並且移除 ExplorerOfWinningPermutations 嘅第一個 NodeForSearching
    remove(): NodeForSearching {
        if (this.empty()) {
            throw "Frontier has been empty already.";
        }
        const node: NodeForSearching = this.frontier[0];
        this.frontier.shift();
        return node;
    }
}

export default QueueFrontier;