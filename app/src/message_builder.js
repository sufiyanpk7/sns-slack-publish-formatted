const { formatDateTime, todayDateTime } = require("./src/date_formatter");

const buildBlockAlertMessage = (message) => {
  if (typeof String.prototype.replaceAll === "undefined") {
    String.prototype.replaceAll = function (match, replace) {
      return this.replace(new RegExp(match, "g"), () => replace);
    };
  }
  message = message.replaceAll("“", '"');
  message = message.replaceAll("”", '"');
  let messageObject = JSON.parse(message);
  let messageSkeleton = {
    text: "Alert",
    blocks: [
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*Client:*\t" + process.env.CLIENT,
          },
          {
            type: "mrkdwn",
            text: "*AWSAccountId:*\t" + messageObject.AWSAccountId,
          },
        ],
      },

      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*AlarmName*\n" + messageObject.AlarmName,
          },

          {
            type: "mrkdwn",
            text: "*AlarmDescription:*\n" + messageObject.AlarmDescription,
          },
        ],
      },
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "DateAndTime",
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*Date:*\n" + todayDateTime.date,
          },
          {
            type: "mrkdwn",
            text: "*Time:*\n" + todayDateTime.time,
          },
        ],
      },
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "State",
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*NewStateValue:*\n" + messageObject.NewStateValue,
          },

          {
            type: "mrkdwn",
            text: "*NewStateReason:*\n" + messageObject.NewStateReason,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text:
              "*StateChangeTime:*\n" +
              formatDateTime(messageObject.StateChangeTime).time,
          },

          {
            type: "mrkdwn",
            text: "*Region:*\n" + messageObject.Region,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*AlarmArn:*\n" + messageObject.AlarmArn,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*OldStateValue:*\n" + messageObject.OldStateValue,
          },
          {
            type: "mrkdwn",
            text: "*OKActions:*\n" + messageObject.OKActions,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*AlarmActions:*\n" + messageObject.AlarmActions,
          },
          {
            type: "mrkdwn",
            text: "*InsufficientDataActions:*\n" + messageObject.OKActions,
          },
        ],
      },
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Trigger",
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*MetricName:*\n" + messageObject.Trigger.MetricName,
          },
          {
            type: "mrkdwn",
            text: "*Namespace:*\n" + messageObject.Trigger.Namespace,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*StatisticType:*\n" + messageObject.Trigger.StatisticType,
          },
          {
            type: "mrkdwn",
            text: "*Unit:*\n" + messageObject.Trigger.Unit,
          },
        ],
      },

      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Dimensions",
        },
      },

      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*Name:*\n" + messageObject.Trigger.Dimensions[0].name,
          },
          {
            type: "mrkdwn",
            text: "*Value:*\n" + messageObject.Trigger.Dimensions[0].value,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*Period:*\n" + messageObject.Trigger.Period,
          },
          {
            type: "mrkdwn",
            text:
              "*EvaluationPeriods:*\n" +
              messageObject.Trigger.EvaluationPeriods,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text:
              "*DatapointsToAlarm:*\n" +
              messageObject.Trigger.DatapointsToAlarm,
          },
          {
            type: "mrkdwn",
            text:
              "*ComparisonOperator:*\n" +
              messageObject.Trigger.ComparisonOperator,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*Threshold:*\n" + messageObject.Trigger.Threshold,
          },
          {
            type: "mrkdwn",
            text:
              "*TreatMissingData:*\n" + messageObject.Trigger.TreatMissingData,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text:
              "*EvaluateLowSampleCountPercentile:*\n" +
              messageObject.Trigger.EvaluateLowSampleCountPercentile,
          },
        ],
      },

      {
        type: "divider",
      },
    ],
  };

  return messageSkeleton;
};

module.exports = buildBlockAlertMessage;
