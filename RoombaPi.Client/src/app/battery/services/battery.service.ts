import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

import { BatteryServiceClient } from "@app/grpc/battery";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

import { BatteryInfo } from "../models/batteryInfo";
import { ChargingSourcesAvailable } from "../models/chargingSourcesAvailable";
import { ChargingState } from "../models/chargingState";


@Injectable({ providedIn: "root" })
export class BatteryService {
  private readonly client: BatteryServiceClient;

  constructor() {
    this.client = new BatteryServiceClient(environment.grpcServer);
  }

  public getBatteryInfo(): Promise<BatteryInfo> {
    return new Promise<BatteryInfo>((resolve, reject) => {
      this.client.getBatteryInfo(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.toObject());
      });
    });
  }

  public getChargingSourcesAvailable(): Promise<ChargingSourcesAvailable> {
    return new Promise<ChargingSourcesAvailable>((resolve, reject) => {
      this.client.getChargingSourcesAvailable(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.toObject());
      });
    });
  }

  public getChargingState(): Promise<ChargingState> {
    return new Promise<ChargingState>((resolve, reject) => {
      this.client.getChargingState(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.toObject().state);
      });
    });
  }
}
