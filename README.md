# Notes

### Generate supabase types

npx supabase gen types typescript --project-id "fspmohikcswypgukfean" --schema public > lib/types.ts

### Disambiguate relations

const fetchReqs = supabase
.from("friend_reqs")
.select(
"_, from:users!friend_reqs_from_id_fkey(_), to:users!friend_reqs_to_id_fkey(\*)"
)

# Starter base

A starting point to help you set up your project quickly and use the common components provided by `react-native-reusables`. The idea is to make it easier for you to get started.

## Features

- NativeWind v4
- Dark and light mode
  - Android Navigation Bar matches mode
  - Persistent mode
- Common components
  - ThemeToggle, Avatar, Button, Card, Progress, Text, Tooltip

<img src="https://github.com/mrzachnugent/react-native-reusables/assets/63797719/42c94108-38a7-498b-9c70-18640420f1bc"
     alt="starter-base-template"
     style="width:270px;" />
