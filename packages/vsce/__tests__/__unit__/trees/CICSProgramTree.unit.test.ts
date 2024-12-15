const getIconPathInResourcesMock = jest.fn();

import { imperative } from "@zowe/zowe-explorer-api";
import { CICSRegionTree } from "../../../src/trees/CICSRegionTree";
import { ICMCIApiResponse } from "@zowe/cics-for-zowe-sdk";
import { CICSProgramTreeItem } from "../../../src/trees/treeItems/CICSProgramTreeItem";
import * as filterUtils from "../../../src/utils/filterUtils";
import { CICSPlexTree } from "../../../src/trees/CICSPlexTree";
import { CICSProgramTree } from "../../../src/trees/CICSProgramTree";

jest.mock("@zowe/cics-for-zowe-sdk");
const zoweSdk = require("@zowe/cics-for-zowe-sdk");
const sessionMock = jest.fn();

jest.mock("../../../src/utils/profileUtils", () => {
    return { getIconPathInResources: getIconPathInResourcesMock };
});
// jest.mock("../../../src/utils/profileUtils", () => {
//     return jest.fn().mockImplementation(() => {
//         return { getIconPathInResources: getIconPathInResourcesMock };
//     });
//     // getIconPathInResources: jest.fn(),
// });
jest.mock("../../../src/trees/treeItems/CICSProgramTreeItem", () => {
    return { CICSProgramTreeItem: jest.fn() };
});
const imperativeSession = new imperative.Session({
    user: "fake",
    password: "fake",
    hostname: "fake",
    protocol: "https",
    type: "basic",
    rejectUnauthorized: false,
});
const CICSSessionTreeMock = {
    session: imperativeSession,
};

const CICSPlexTreeMock = {
    getPlexName: jest.fn(),
};
const cicsRegionTreeMock = {
    parentSession: CICSSessionTreeMock,
    getRegionName: jest.fn().mockReturnValue("IYK2ZXXXX"),
    // getPlexName: jest.fn().mockImplementation(() => getPlexName),
};
const CICSProgramTreeItemMock = {};
const getResourceMock = jest.spyOn(zoweSdk, "getResource");
const iconPath = "/icon/path";
const resourceName = "testResource";
const cicsprogram = "cicsprogram";
const value = "NOT (PROGRAM=CEE* OR PROGRAM=DFH* OR PROGRAM=CJ* OR PROGRAM=EYU* OR PROGRAM=CSQ* OR PROGRAM=CEL* OR PROGRAM=IGZ*)";
const defaultReturn: ICMCIApiResponse = {
    response: {
        resultsummary: { api_response1: "1024", api_response2: "0", recordcount: "0", displayed_recordcount: "0" },
        records: {},
    },
};
describe("CICSProgramTree", () => {
    let sut: CICSProgramTree;

    beforeEach(() => {
        getResourceMock.mockClear();
        getIconPathInResourcesMock.mockReturnValue(iconPath);
        sessionMock.mockReturnValue(imperativeSession);
        sut = new CICSProgramTree(cicsRegionTreeMock as any as CICSRegionTree);
        getResourceMock.mockImplementation(async () => defaultReturn);
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
        it("Should invoke getDefaultProgramFilter when activeFilter is undefined", async () => {
            const getDefaultProgramFilter = jest.spyOn(filterUtils, "getDefaultProgramFilter").mockResolvedValueOnce(value);
            defaultReturn.response.records[resourceName.toLowerCase()] = [{ prop: "test1" }, { prop: "test2" }];

            await sut.loadContents();
            expect(getDefaultProgramFilter).toHaveBeenCalled();
            expect(sut.activeFilter).toBeUndefined();
        });

        it("Should invoke toEscapedCriteriaString when activeFilter is defined", async () => {
            sut.activeFilter = "Active";
            defaultReturn.response.records[cicsprogram.toLowerCase()] = [{ prop: "test1" }, { prop: "test2" }];
            const toEscapedCriteriaString = jest.spyOn(filterUtils, "toEscapedCriteriaString").mockReturnValueOnce("PROGRAM");

            await sut.loadContents();
            expect(toEscapedCriteriaString).toHaveBeenCalled();
            expect(sut.activeFilter).toBeDefined();
        });
    });
});
