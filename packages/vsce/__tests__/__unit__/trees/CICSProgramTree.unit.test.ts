import { CICSProgramTree } from "../../../src/trees/CICSProgramTree";
import { CICSRegionTree } from "../../../src/trees/CICSRegionTree";
import { CICSProgramTreeItem } from "../../../src/trees/treeItems/CICSProgramTreeItem";
import * as filterUtils from "../../../src/utils/filterUtils";
// const cicsRegionTree = require("../../../src/trees/CICSRegionTree");

const sessionMock = jest.fn();
const getIconPathInResourcesMock = jest.fn();

jest.mock("../../../src/trees/CICSRegionTree", () => {
    return {
        CICSRegionTree: jest.fn().mockImplementation(() => {
            return {
                parentSession: sessionMock,
            };
        }),
    };
});

jest.mock("../../../src/utils/profileUtils", () => {
    return {
        profileUtils: jest.fn().mockImplementation(() => {
            return { getIconPathInResources: getIconPathInResourcesMock };
        }),
    };
});
jest.mock("../../../src/trees/treeItems/CICSProgramTreeItem", () => {
    return { CICSProgramTreeItem: jest.fn() };
});
// jest.mock("../../../src/utils/filterUtils");

const cicsRegionTreeMock = {
    parentSession: sessionMock,
};

const CICSProgramTreeItemMock = {};

describe("CICSProgramTree", () => {
    let sut: CICSProgramTree;

    beforeEach(() => {
        getIconPathInResourcesMock.mockReturnValue("/icon/path");
        sut = new CICSProgramTree(cicsRegionTreeMock as any as CICSRegionTree, getIconPathInResourcesMock());
        jest.spyOn(filterUtils, "getDefaultProgramFilter").mockResolvedValueOnce(
            "NOT (PROGRAM=CEE* OR PROGRAM=DFH* OR PROGRAM=CJ* OR PROGRAM=EYU* OR PROGRAM=CSQ* OR PROGRAM=CEL* OR PROGRAM=IGZ*)",
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("Test suite for addProgram()", () => {
        it("Should add CICSProgramTreeItem into program", () => {
            sut.addProgram(CICSProgramTreeItemMock as any as CICSProgramTreeItem);
            expect(sut.children.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe("Test suite for loadContents()", () => {
        it("Should return default value", async () => {
            // sessionMock.mockReturnValue(true);

            await sut.loadContents();
            expect(filterUtils.getDefaultProgramFilter()).toHaveBeenCalled();
        });
    });
});

// describe("CICSProgramTree Test", () => {
//     let sut: CICSProgramTree;
//     beforeEach(() => {
//         sut = new CICSProgramTree(cicsRegionTreeMock as any as CICSRegionTree, iconPath);
//     });
//     it("Calling sut for test", () => {
//         sut.addProgram(CICSProgramTreeItemMock as CICSProgramTreeItem);
//         expect(sut.children.length).toBeGreaterThanOrEqual(1);
//     });
// });
