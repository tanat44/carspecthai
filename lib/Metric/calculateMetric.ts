import { CarLibrary } from "../CarLibrary";
import { Trim } from "../Trim";
import { sortUndefined } from "../utils";
import { MetricPoint, Metrics } from "./types";

export function calculateMetrics(lib: CarLibrary): Metrics {
  const metric: Metrics = {};
  metric.price = priceMetric(lib);
  metric.length = lengthMetric(lib);
  metric.floorHeight = floorHeightMetric(lib);
  metric.passengerVolume = passengerVolumeMetric(lib);
  metric.accelTo100 = accelTo100Metric(lib);
  metric.range = rangeMetric(lib);

  return metric;
}

function priceMetric(lib: CarLibrary): MetricPoint[] {
  return calculateMetric(lib, (trim: Trim) => trim.price);
}

function lengthMetric(lib: CarLibrary): MetricPoint[] {
  return calculateMetric(lib, (trim: Trim) => trim.physical?.length);
}

function floorHeightMetric(lib: CarLibrary): MetricPoint[] {
  return calculateMetric(lib, (trim: Trim) => trim.physical?.floorHeight);
}

function passengerVolumeMetric(lib: CarLibrary): MetricPoint[] {
  return calculateMetric(lib, (trim: Trim) => {
    if (
      !trim.physical?.floorHeight ||
      !trim.physical.height ||
      !trim.physical.width ||
      !trim.physical.wheelbase
    )
      return undefined;

    const value =
      ((trim.physical.height - trim.physical.floorHeight) *
        trim.physical.width *
        trim.physical.wheelbase) /
      1e9;

    return parseFloat(value.toFixed(2));
  });
}

function accelTo100Metric(lib: CarLibrary): MetricPoint[] {
  return calculateMetric(lib, (trim: Trim) => trim.performance?.to100);
}

function rangeMetric(lib: CarLibrary): MetricPoint[] {
  return calculateMetric(lib, (trim: Trim) => trim.rangeWltp);
}

function calculateMetric(
  lib: CarLibrary,
  accessor: (trim: Trim) => number | undefined,
): MetricPoint[] {
  let output: MetricPoint[] = [];
  const cars = lib.allCars;
  cars.forEach((car) => {
    car.trims.forEach((trim) => {
      const value = accessor(trim);
      const point: MetricPoint = {
        carFullname: trim.car?.manufacture + " " + trim.fullName,
        value,
        valuePerPrice: value && value / (trim.price ?? Infinity),
        trim: {
          slug: trim.slug,
          carSlug: trim.car?.slug ?? "",
        },
      };
      output.push(point);
    });
  });
  output = sortUndefined(output, "value");
  return output;
}
