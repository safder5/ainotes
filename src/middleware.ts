import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const isAuthRoute =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/sign-up";
  if (isAuthRoute) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // const { searchParams, pathname } = new URL(request.url);
  // if (!searchParams.get("noteID") && pathname === "/") {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();

  //   if (user) {
  //     const { newestNoteId } = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-newest-note?userId=${user.id}`,
  //     ).then((res) => res.json());
  //     if (newestNoteId) {
  //       const url = request.nextUrl.clone();
  //       url.searchParams.set("noteId", newestNoteId);
  //       return NextResponse.redirect(url);
  //     } else {
  //       const { noteID } = await fetch(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-new-note?userId=${user.id}`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         },
  //       ).then((res) => res.json());
  //       const url = request.nextUrl.clone();
  //       url.searchParams.set("noteId", noteID);
  //       return NextResponse.redirect(url);
  //     }
  //   }
  // }

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  //   if (
  //     !user &&
  //     !request.nextUrl.pathname.startsWith('/login') &&
  //     !request.nextUrl.pathname.startsWith('/auth') &&
  //     !request.nextUrl.pathname.startsWith('/error')
  //   ) {
  //     // no user, potentially respond by redirecting the user to the login page
  //     const url = request.nextUrl.clone()
  //     url.pathname = '/login'
  //     return NextResponse.redirect(url)
  //   }

  return supabaseResponse;
}
