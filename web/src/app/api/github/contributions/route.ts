import { NextResponse } from "next/server";

type ContributionLevel = 0 | 1 | 2 | 3 | 4;
type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};
type ContributionWeek = { days: ContributionDay[] };

type ContributionsResponse = {
  source: "github" | "placeholder";
  total: number;
  weeks: ContributionWeek[];
};

type GitHubGraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
              contributionLevel: string;
            }>;
          }>;
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
};

function levelFromCount(count: number): ContributionLevel {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function placeholderContributions(): ContributionsResponse {
  const today = new Date();
  const days = 7 * 20;

  const all: ContributionDay[] = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const seed = d.getFullYear() * 10_000 + (d.getMonth() + 1) * 100 + d.getDate();
    const pseudo = (seed * 9301 + 49297) % 233280;
    const count = pseudo % 12;

    all.push({
      date: d.toISOString().slice(0, 10),
      count,
      level: levelFromCount(count),
    });
  }

  const weeks: ContributionWeek[] = [];
  for (let i = 0; i < all.length; i += 7) {
    weeks.push({ days: all.slice(i, i + 7) });
  }

  const total = all.reduce((acc, d) => acc + d.count, 0);
  return { source: "placeholder", total, weeks };
}

function levelFromGitHub(level: string): ContributionLevel {
  switch (level) {
    case "NONE":
      return 0;
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
    default:
      return 0;
  }
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME;

  if (!token || !username) {
    return NextResponse.json(placeholderContributions());
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    return NextResponse.json(placeholderContributions(), { status: 200 });
  }

  const json = (await res.json()) as GitHubGraphQLResponse;
  const calendar =
    json.data?.user?.contributionsCollection?.contributionCalendar || null;

  if (!calendar?.weeks) {
    return NextResponse.json(placeholderContributions(), { status: 200 });
  }

  const weeks: ContributionWeek[] = calendar.weeks.map((w) => ({
    days: w.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      level: levelFromGitHub(d.contributionLevel),
    })),
  }));

  const payload: ContributionsResponse = {
    source: "github",
    total: calendar.totalContributions,
    weeks,
  };

  return NextResponse.json(payload);
}
