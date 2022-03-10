export type TokenKind = "Obstruction" | "Squad" | "Humvee"

export class Token {
  x: number;
  y: number;
  kind: TokenKind;
  playerIndex: number;
  constructor(x: number, y: number, kind: TokenKind, playerIndex: number) {
    this.x = x;
    this.y = y;
    this.kind = kind;
    this.playerIndex = playerIndex;
  }
}

export class ObstructionToken extends Token {
  constructor(x: number, y: number) {
    super(x, y, "Obstruction", -1)
  }
}

export class SquadToken extends Token {
  constructor(x: number, y: number, playerIndex: number) {
    super(x, y, "Squad", playerIndex)
  }
}

export class HumveeToken extends Token {
  constructor(x: number, y: number, playerIndex: number) {
    super(x, y, "Humvee", playerIndex)
  }
}
