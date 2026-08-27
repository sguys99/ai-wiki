---
title: "NAV2 - Nav2 Docs"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/nav2-2026-official-documentation.md
raw_filename: "nav2-2026-official-documentation.md"
source_collection: external
author: "Open Navigation LLC"
url: "https://docs.nav2.org/rolling/"
publisher: "docs.nav2.org"
fetched_at: "2026-08-28T07:41:37+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/nav2-2026-official-documentation/page-full.png
    raw: raw/articles/nav2-2026-official-documentation-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/nav2-2026-official-documentation/crop01.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig03
    file: assets/nav2-2026-official-documentation/crop02.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig04
    file: assets/nav2-2026-official-documentation/crop03.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig05
    file: assets/nav2-2026-official-documentation/crop04.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop04.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/nav2-2026-official-documentation/crop05.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop05.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/nav2-2026-official-documentation/crop06.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop06.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/nav2-2026-official-documentation/crop07.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop07.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/nav2-2026-official-documentation/crop08.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop08.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/nav2-2026-official-documentation/crop09.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop09.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/nav2-2026-official-documentation/crop10.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop10.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig12
    file: assets/nav2-2026-official-documentation/crop11.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop11.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig13
    file: assets/nav2-2026-official-documentation/crop12.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop12.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---


# NAV2

## Your Autonomous Navigation Framework

An open-source, production-grade autonomy framework trusted by 300+ companies worldwide. Building on 15 years of heritage to accelerate the robotics industry.

[Get Started](getting_started/#getting-started)[Concepts](getting_started/navigation_concepts/#navigation-concepts)[First-Time Setup](configuration_and_development/first_time_robot_setup_guide/#first-time-robot-setup-guide)

## Our Sponsors

## Services

If you need professional services related to Nav2, please contact Open Navigation at [info@opennav.org](mailto:info@opennav.org).

## Overview

Nav2 is the professionally-supported successor of the ROS Navigation Stack deploying the same kinds of technology powering Autonomous Vehicles brought down, optimized, and reworked for mobile and surface robotics. This project allows for mobile robots to navigate through complex environments to complete user-defined application tasks with nearly any class of robot kinematics and dynamics; shape size; indoor or outdoor, or sensor configuration. Not only can it move from Point A to Point B, but it can have intermediary poses, and represent other types of tasks like object following, complete coverage navigation, and more. Nav2 is a production-grade and high-quality navigation framework trusted by 300+ companies worldwide.

It provides perception, planning, control, localization, visualization, behaviors, and much more to build highly reliable autonomous systems. This will compute an environmental model from sensor and semantic data, dynamically route a path through the environment, compute feasible motor commands, avoid obstacles, and structures higher-level robot behaviors.

Nav2 uses behavior trees to create customized and intelligent navigation behavior via orchestrating many independent modular servers. A task server can be used to compute a path, control effort, behavior, or any other navigation related task. These separate servers communicate with the behavior tree (BT) over a ROS interface such as an action server or service. A robot may utilize potentially many different behavior trees to allow a robot to perform many types of unique and complex tasks. A task server may have multiple plugins for controllers, planners, and behaviors to create contextual navigation behaviors.

 It has tools to: - Load, serve, and store maps - Localize the robot on a provided map (SLAM provides the initial map) - Plan a complete path through the environment, even kinematically feasibly for large robots - Control the robot to follows the path and dynamically adjust to avoid collision - Smooth plans to be more continuous, smooth, and/or feasible - Convert sensor data into an environmental model of the world - Build complicated and highly-customizable robot behaviors using behavior trees - Conduct pre-defined behaviors in case of failure, human intervention, or other - Follow sequential waypoints comprising a mission - Manage the system's program lifecycle and watchdog for the servers - Easy dynamically loaded plugins for creating customized algorithms, behaviors and so on - Monitor raw sensor data for imminent collision or dangerous situation - Python3 API to interact with Nav2 and its internal task servers in a pythonic manner - A smoother on output velocities to guarantee dynamic feasibility of commands - ... and more! 

We also provide a set of starting plugins to get you going. A list of all plugins can be found on [Navigation Plugins](configuration_and_development/navigation_plugins/#navigation-plugins) - but they include algorithms for the spanning cross section of common behaviors and robot platform types.

- [Citations](about_and_contact/citations/#citations) - If you use the navigation framework, an algorithm from this repository, or ideas from it please cite this work in your papers!

 CSS located in overrides/assets/stylesheets/robots_marquee.css 

 Duplicate for seamless loop 

## Distributions

Nav2 is available across multiple ROS 2 distributions with varying levels of support:

 CSS files located in overrides/assets/stylesheets/distro_grid.css 

Rolling Ridley

Development

Lyrical Lynx

Active Support

Kilted Kaiju

Maintained

Jazzy Jalisco

Active Support

Iron Irwini

End of Life

Humble Hawksbill

Maintained

Galactic Geochelone

End of Life
