import { redirect } from"next/navigation";
import { getServerSession } from"next-auth";
import { authOptions } from"@/lib/auth";
import { db } from"@/lib/db";
import Link from"next/link";
import { formatDistanceToNow } from"date-fns";
import {
  FileText, Clock, ExternalLink,
  Crown, Zap, BarChart3, Calendar, User, Sparkles
} from"lucide-react";
import { DAILY_FREE_LIMIT } from"@/lib/limits";

export const metadata = {
  title:"My Dashboard | ToolNova",
  description:"View your generation history, usage stats, and subscription plan.",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || !user.email) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Look up DB user by email (since JWT user.id is Google's sub, not our DB cuid)
  const dbUser = await db.user.findUnique({ where: { email: user.email } });

  if (!dbUser) {
    // User hasn't used any tools yet — show empty dashboard
    return (
      <div className="page-shell min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 font-heading">My Dashboard</h1>
            <p className="mt-2 text-slate-600">Welcome, {user.name?.split("")[0] ||"there"}!</p>
          </div>
          <div className="content-panel p-12 text-center">
            <div className="mx-auto h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No history yet</h3>
            <p className="text-slate-500 mb-6">Start using our AI tools to see your history here.</p>
            <Link href="/tools" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Explore Tools</Link>
          </div>
        </div>
      </div>
    );
  }

  // Fetch all data in parallel using DB user ID
  const [history, subscription, todayCount] = await Promise.all([
    db.generationHistory.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt:"desc" },
      take: 50,
    }),
    db.subscription.findFirst({
      where: { userId: dbUser.id, status:"active" },
    }),
    db.generationHistory.count({
      where: {
        userId: dbUser.id,
        createdAt: { gte: startOfToday },
      },
    }),
  ]);

  const isPremium = !!subscription;
  const remaining = isPremium ? -1 : Math.max(0, DAILY_FREE_LIMIT - todayCount);

  return (
    <div className="page-shell min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 font-heading">
            My Dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            Welcome back, {user.name?.split("")[0] ||"there"}!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Plan Card */}
          <div className={`rounded-2xl p-5 border ${isPremium
            ?"bg-gradient-to-br from-primary to-teal-600 border-transparent text-white"
            :"content-panel"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${isPremium ?"bg-white/20" :"bg-indigo-50"}`}>
                <Crown className={`h-5 w-5 ${isPremium ?"text-white" :"text-indigo-600"}`} />
              </div>
              <span className={`text-sm font-semibold ${isPremium ?"text-white/80" :"text-slate-500"}`}>
                Current Plan
              </span>
            </div>
            <p className={`text-2xl font-black ${isPremium ?"text-white" :"text-slate-900"}`}>
              {isPremium ?"Pro" :"Free"}
            </p>
            {!isPremium && (
              <Link href="/pricing" className="mt-2 inline-block text-xs font-semibold text-indigo-600 hover:underline">
                Upgrade to Pro →
              </Link>
            )}
            {isPremium && subscription?.currentPeriodEnd && (
              <p className="mt-1 text-xs text-white/70">
                Renews {formatDistanceToNow(new Date(subscription.currentPeriodEnd), { addSuffix: true })}
              </p>
            )}
          </div>

          {/* Today's Usage */}
          <div className="surface-card-quiet p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-slate-500">
                Today&apos;s Usage
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900">
              {todayCount}{isPremium ?"" :` / ${DAILY_FREE_LIMIT}`}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {isPremium ?"Unlimited generations" :`${remaining} remaining today`}
            </p>
          </div>

          {/* Total Generations */}
          <div className="surface-card-quiet p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-slate-500">
                Total Generations
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900">
              {history.length}{history.length === 50 ?"+" :""}
            </p>
            <p className="mt-1 text-xs text-slate-500">All time</p>
          </div>

          {/* Account */}
          <div className="surface-card-quiet p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-slate-500">
                Account
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900 truncate">
              {user.name ||"User"}
            </p>
            <p className="mt-1 text-xs text-slate-500 truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Generation History */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Recent Generations
          </h2>
          <Link
            href="/tools"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Explore Tools →
          </Link>
        </div>

        {history.length === 0 ? (
          <div className="content-panel p-12 text-center">
            <div className="mx-auto h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No history yet</h3>
            <p className="text-slate-500 mb-6">
              You haven&apos;t generated anything using our AI tools yet.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore Tools
            </Link>
          </div>
        ) : (
          <div className="content-panel overflow-hidden">
            <ul className="divide-y divide-slate-200">
              {history.map((item) => {
                let parsedPrompt = item.prompt;
                try {
                  const data = JSON.parse(item.prompt);
                  parsedPrompt = data.prompt || item.prompt;
                } catch (e) {
                  // Fallback to raw string if not JSON
                }

                const displayPrompt = parsedPrompt.length > 100
                  ? parsedPrompt.substring(0, 100) +"..."
                  : parsedPrompt;

                const displayResponse = item.response.length > 200
                  ? item.response.substring(0, 200) +"..."
                  : item.response;

                return (
                  <li key={item.id} className="p-6 hover:bg-slate-50 :bg-slate-800/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                            {item.toolSlug.replace(/-/g,"").toUpperCase()}
                          </span>
                          <span className="flex items-center text-xs text-slate-500">
                            <Clock className="mr-1 h-3 w-3" />
                            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium text-slate-900 truncate mb-1">
                          Prompt: {displayPrompt}
                        </h4>
                        <div className="text-sm text-muted-foreground bg-muted/60 rounded-xl p-3 mt-3 border border-border/70">
                          {displayResponse}
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <Link
                          href={`/tools/${item.toolSlug}`}
                          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 :bg-slate-700 transition-colors"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open Tool
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Upgrade CTA for free users */}
        {!isPremium && (
          <div className="mt-8 rounded-3xl bg-gradient-primary p-8 text-center text-white shadow-premium-lg">
            <Crown className="h-10 w-10 mx-auto mb-3 text-yellow-300" />
            <h3 className="text-xl font-black mb-2">Unlock Unlimited Generations</h3>
            <p className="text-white/80 mb-5 max-w-md mx-auto">
              Upgrade to Pro and get unlimited AI generations, premium models, and an ad-free experience.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-white text-primary font-black px-8 py-3 hover:bg-white/90 transition-all shadow-xl"
            >
              Upgrade to Pro →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
