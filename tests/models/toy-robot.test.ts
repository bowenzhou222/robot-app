import { DEFAULT_TABLE_SIZE } from "../../src/constants";
import ToyRobot from "../../src/models/toy-robot";

describe("toy-robot", () => {
  let subject: any;
  let robot: ToyRobot;

  beforeEach(() => {
    robot = new ToyRobot(DEFAULT_TABLE_SIZE);
  });

  describe("place", () => {
    beforeEach(() => {
      subject = () => {
        robot.place(1, 2, "NORTH");
      };
    });

    it("sets attributes correctly", () => {
      subject();
      expect(robot.getX()).toEqual(1);
      expect(robot.getY()).toEqual(2);
      expect(robot.getDirection()).toEqual("NORTH");
      expect(robot.getPlaced()).toBe(true);
    });

    describe("invalid position", () => {
      beforeEach(() => {
        subject = () => {
          robot.place(1, 5, "NORTH");
        };
      });

      it("does not set attributes", () => {
        subject();
        expect(robot.getPlaced()).toBe(false);
      });
    });
  });

  describe("move", () => {
    let direction: string;

    beforeEach(() => {
      subject = () => {
        robot.place(2, 2, direction);
        robot.move();
      };
    });

    describe("to north", () => {
      beforeEach(() => {
        direction = "NORTH";
      });

      it("updates x and y correctly", () => {
        subject();
        expect(robot.getX()).toEqual(2);
        expect(robot.getY()).toEqual(3);
      });
    });

    describe("to south", () => {
      beforeEach(() => {
        direction = "SOUTH";
      });

      it("updates x and y correctly", () => {
        subject();
        expect(robot.getX()).toEqual(2);
        expect(robot.getY()).toEqual(1);
      });
    });

    describe("to west", () => {
      beforeEach(() => {
        direction = "WEST";
      });

      it("updates x and y correctly", () => {
        subject();
        expect(robot.getX()).toEqual(1);
        expect(robot.getY()).toEqual(2);
      });

      describe("out of boundary of the table", () => {
        beforeEach(() => {
          direction = "WEST";
          subject = () => {
            robot.place(1, 2, direction);
            robot.move();
            robot.move();
            robot.move();
          };
        });

        it("updates x and y correctly", () => {
          subject();
          expect(robot.getX()).toEqual(0);
          expect(robot.getY()).toEqual(2);
        });
      });
    });

    describe("to east", () => {
      beforeEach(() => {
        direction = "EAST";
      });

      it("updates x and y correctly", () => {
        subject();
        expect(robot.getX()).toEqual(3);
        expect(robot.getY()).toEqual(2);
      });
    });
  });

  describe("left", () => {
    let direction: string;

    describe("when robot has not been placed", () => {
      beforeEach(() => {
        subject = () => {
          robot.left();
        };
      });

      it("does not update robot.direction", () => {
        subject();
        expect(robot.getDirection()).toBe(null);
      });
    });

    describe("when robot has been placed", () => {
      beforeEach(() => {
        subject = () => {
          robot.place(1, 2, direction);
          robot.left();
        };
      });

      describe("when robot is facing NORTH", () => {
        beforeEach(() => {
          direction = "NORTH";
        });

        it("sets robot.direction correctly", () => {
          subject();
          expect(robot.getDirection()).toEqual("WEST");
        });
      });

      describe("when robot is facing SOUTH", () => {
        beforeEach(() => {
          direction = "SOUTH";
        });

        it("sets robot.direction correctly", () => {
          subject();
          expect(robot.getDirection()).toEqual("EAST");
        });
      });

      describe("when robot is facing WEST", () => {
        beforeEach(() => {
          direction = "WEST";
        });

        it("sets robot.direction correctly", () => {
          subject();
          expect(robot.getDirection()).toEqual("SOUTH");
        });
      });

      describe("when robot is facing EAST", () => {
        beforeEach(() => {
          direction = "EAST";
        });

        it("sets robot.direction correctly", () => {
          subject();
          expect(robot.getDirection()).toEqual("NORTH");
        });
      });
    });
  });

  describe("right", () => {
    let direction: string;

    describe("when robot has not been placed", () => {
      beforeEach(() => {
        subject = () => {
          robot.right();
        };
      });

      it("does not update robot.direction", () => {
        subject();
        expect(robot.getDirection()).toBe(null);
      });
    });

    describe("when robot has been placed", () => {
      beforeEach(() => {
        subject = () => {
          robot.place(1, 2, direction);
          robot.right();
        };
      });

      describe("when robot is facing NORTH", () => {
        beforeEach(() => {
          direction = "NORTH";
        });

        it("sets robot.direction correctly", () => {
          subject();
          expect(robot.getDirection()).toEqual("EAST");
        });
      });

      describe("when robot is facing SOUTH", () => {
        beforeEach(() => {
          direction = "SOUTH";
        });

        it("sets robot.direction correctly", () => {
          subject();
          expect(robot.getDirection()).toEqual("WEST");
        });
      });

      describe("when robot is facing WEST", () => {
        beforeEach(() => {
          direction = "WEST";
        });

        it("sets robot.direction correctly", () => {
          subject();
          expect(robot.getDirection()).toEqual("NORTH");
        });
      });

      describe("when robot is facing EAST", () => {
        beforeEach(() => {
          direction = "EAST";
        });

        it("sets robot.direction correctly", () => {
          subject();
          expect(robot.getDirection()).toEqual("SOUTH");
        });
      });
    });
  });

  describe("geenrateReport", () => {
    beforeEach(() => {
      subject = () => {
        robot.place(0, 4, "SOUTH");
        return robot.generateReport();
      };
    });

    it("generates report correctly", () => {
      expect(subject()).toEqual("Output: 0,4,SOUTH");
    });
  });
});
