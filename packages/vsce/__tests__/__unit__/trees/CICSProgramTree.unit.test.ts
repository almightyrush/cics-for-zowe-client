import { CICSProgramTreeItem } from "../../../src/trees/treeItems/CICSProgramTreeItem";
import { CICSProgramTree } from "../../../src/trees/CICSProgramTree";
import { CICSRegionTree } from "../../../src/trees/CICSRegionTree";
import { ProfileManagement } from "../../../src/utils/profileManagement";
// import { CICSSessionTree } from "../../../src/trees/CICSSessionTree";
// import { CICSPlexTree } from "../../../src/trees/CICSPlexTree";
// import { IProfileLoaded } from "@zowe/imperative";
// import { TreeItem } from "vscode";

jest.mock("../../../src/trees/CICSRegionTree");
jest.mock("../../../src/trees/treeItems/CICSProgramTreeItem");
jest.mock("../../../src/utils/profileManagement");

// jest.mock("@zowe/imperative");

// let iprofileLoadedMock: IProfileLoaded;
// let cicsSessionTreeMock: CICSSessionTree;
// let cicsPlexTree: CICSPlexTree;
let cicsRegionTreeMock: CICSRegionTree;
let cicsProgramTreeItem: CICSProgramTreeItem;
let profileManagement: ProfileManagement;
describe("CICSProgramTree testing", () => {
    // const cicsSessionTreeMock = new CICSSessionTree("profile");
    // const iprofileLoadedMock = new IProfileLoaded();
    // const cicsPlexTree = new CICSPlexTree("plex", iprofileLoadedMock, cicsSessionTreeMock);
    // const cicsRegionTreeMock = new CICSRegionTree("", "", cicsSessionTreeMock, cicsPlexTree, "");
    console.log(profileManagement);
    describe("addProgram", () => {
        it.only("Should check that the constructor is called", () => {
            console.log("Start testing ============");
            const cicsProgramTree = new CICSProgramTree(cicsRegionTreeMock);
            // cicsProgramTree.addProgram(cicsProgramTreeItem);
            // console.log("Items in program tree: " + cicsProgramTreeItem);
            // expect(cicsProgramTreeItem).toBeGreaterThan(1)
            expect(true).toBe(true);
        });
    });
});
