import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

import { CliffServiceClient } from "@app/grpc/cliff";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

import { CliffSensorsStatus } from "../models/cliffSensorsStatus";

@Injectable({ providedIn: "root" })
export class CliffService {
  private readonly client: CliffServiceClient;

  constructor() {
    this.client = new CliffServiceClient(environment.grpcServer);
  }

  public getCliffSensorsStatus(): Promise<CliffSensorsStatus> {
    return new Promise<CliffSensorsStatus>((resolve, reject) => {
      this.client.getCliffSensorsStatus(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.toObject());
      });
    });
  }
}
