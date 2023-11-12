import request from "supertest";
import { initGameServer } from "../src/init-game-server";
import * as constants from "../src/constants";

describe("init", () => {
  let app = initGameServer();

  describe("route not found", () => {
    it("returns error", async () => {
      const res = await request(app).get("/invalid-path");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("/robot", () => {
    it("returns correct report", async () => {
      const res = await request(app)
        .post("/robot")
        .set({ "Content-Type": "text/plain", Accept: "*/*" })
        .send(
          ["PLACE 0,0,NORTH", "MOVE", "LEFT", "RIGHT", "REPORT", "MOVE"].join(
            "\n"
          )
        );
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("Output: 0,1,NORTH\n");
    });

    describe("more complicated commands", () => {
      it("returns correct report", async () => {
        const res = await request(app)
          .post("/robot")
          .set({ "Content-Type": "text/plain", Accept: "*/*" })
          .send(
            [
              "PLACE 0,0,NORTH",
              "REPORT",
              "MOVE",
              "LEFT",
              "RIGHT",
              "REPORT",
              "MOVE",
              "LEFT",
              "LEFT",
              "REPORT",
              "MOVE",
              "MOVE",
              "REPORT",
              "RIGHT",
              "RIGHT",
              "MOVE",
              "MOVE",
              "MOVE",
              "MOVE",
              "MOVE",
              "MOVE",
              "MOVE",
              "REPORT",
              "RIGHT",
              "MOVE",
              "MOVE",
              "REPORT",
              "MOVE",
              "MOVE",
              "MOVE",
              "MOVE",
              "MOVE",
              "MOVE",
              "MOVE",
              "MOVE",
              "REPORT",
              "PLACE 0,0,EAST",
              "REPORT",
              "MOVE",
              "REPORT",
            ].join("\n")
          );
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual(
          [
            "Output: 0,0,NORTH",
            "Output: 0,1,NORTH",
            "Output: 0,2,SOUTH",
            "Output: 0,0,SOUTH",
            "Output: 0,4,NORTH",
            "Output: 2,4,EAST",
            "Output: 4,4,EAST",
            "Output: 0,0,EAST",
            "Output: 1,0,EAST",
          ].join("\n") + "\n"
        );
      });
    });
  });

  describe("errorHandler", () => {
    beforeEach(() => {
      // @ts-ignore
      constants.REQUEST_BODY_SIZE_LIMIT = "1b";
      app = initGameServer();
    });

    it("returns error", async () => {
      const res = await request(app)
        .post("/robot")
        .set({ "Content-Type": "text/plain", Accept: "*/*" })
        .send(
          ["PLACE 0,0,NORTH", "MOVE", "LEFT", "RIGHT", "REPORT", "MOVE"].join(
            "\n"
          )
        );
      expect(res.statusCode).toEqual(500);
      expect(res.text).toEqual("Internal Error");
    });
  });
});
