import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

import { BumperServiceClient } from "@app/grpc/bumper";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

import { LightBumperStatus } from "../models/lightBumperStatus";
import { BumperStatus } from "../models/bumperStatus";

@Injectable()
export class BumperService {
  private readonly client: BumperServiceClient;

  constructor() {
    this.client = new BumperServiceClient(environment.grpcServer);
  }

  public getBumpsStatus(): Promise<BumperStatus> {
    return new Promise<BumperStatus>((resolve, reject) => {
      this.client.getBumpsStatus(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.toObject());
      });
    });
  }

  public getLightBumpersStatus(): Promise<LightBumperStatus> {
    return new Promise<LightBumperStatus>((resolve, reject) => {
      this.client.getLightBumpersStatus(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.toObject());
      });
    });
  }

  public isVirtualWallPresent(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.client.isVirtualWallPresent(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.getVirtualWallPresent());
      });
    });
  }
}
