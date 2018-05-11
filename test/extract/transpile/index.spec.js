"use strict";

const fs               = require("fs");
const path             = require("path");
const expect           = require("chai").expect;
const normalizeNewline = require('normalize-newline');
const transpile        = require("../../../src/extract/transpile");

describe("transpiler", () => {
    it("As the 'livescript' transpiler is not available, returns the original source", () => {
        expect(
            transpile(".ls", "whatever the bever")
        ).to.equal("whatever the bever");
    });

    it("Does not confuse .ts for .tsx", () => {
        const lInputFixture = fs.readFileSync(
            path.join(__dirname, "fixtures/dontconfuse_ts_for_tsx/input/Observable.ts"),
            'utf8'
        );
        const lTranspiledFixture = fs.readFileSync(
            path.join(__dirname, "fixtures/dontconfuse_ts_for_tsx/transpiled/Observable.js"),
            'utf8'
        );

        expect(
            normalizeNewline(
                transpile(".ts", lInputFixture)
            )
        ).to.equal(
            normalizeNewline(lTranspiledFixture)
        );
    });
});
