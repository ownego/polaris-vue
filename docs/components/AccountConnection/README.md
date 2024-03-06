---
title: Account connection
category: Actions
examples:
  - fileName: Default.vue
    frameHeight: 300
    title: Default
    description: Use to let merchants connect or disconnect their store to their third-party accounts, like Facebook.
---

# {{ $frontmatter.title }}

<Lede>

{{ $frontmatter.description }}

</Lede>

<Examples>

<<< ./[examples]

</Examples>

## Props

<PropsTable />

## Slots

<SlotsTable />

<div style="font-size: 0.8125rem">

## Best practices

The account component should:

- Be placed at the top of the Account page for the relevant sales channel
- Identify the name of the platform or service merchants can connect to
- Show whether the account is connected or disconnected so that merchants can easily connect or disconnect an account
- Include a link to the relevant sales channel or platform terms and conditions, including information about any charges or fees that merchants may incur by using the channel or platform
- Link to terms and conditions, which should open up on the sales channel developer’s website in a new browser window

---

## Content guidelines

### Title

The account connection title should be the name of the platform or service that merchants can connect to, followed by the word “account”. Write account connection titles in sentence case (capitalize the first word and proper nouns only).

#### For example:

- Facebook account
- Mailchimp account
- Instagram account

<DoDont>

#### Do

- Facebook account
- Instagram account

#### Don’t

- Connect your Account
- Instagram Account

</DoDont>

### Terms and conditions

Clearly link to your terms and conditions and let merchants know about any additional costs of your service.

<DoDont>

#### Do

- By clicking Connect, you agree to accept Sample’s terms and conditions.
- You’ll pay a commission rate of 15% on sales made through Sample.

#### Don’t

Learn about terms, conditions, and payment details.

</DoDont>

### Connect button

Always use the verb Connect in the button of the account connection component. When merchants click or tap “Connect” it should open up your platform or service’s authorization page in a new browser window.

<DoDont>

#### Do

Connect

#### Don’t

Connect to app

</DoDont>

---

</div>
