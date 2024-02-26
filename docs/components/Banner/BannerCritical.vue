<template>
<Banner
  title="High risk of fraud detected"
  tone="critical"
  :action="{ content: 'Review risk analysis', url: '' }"
>
  <Text as="p">
    Before fulfilling this order or capturing payment, please 
    <Link url="">review the Risk Analysis</Link> and determine if this order is fraudulent.
  </Text>
</Banner>
</template>
