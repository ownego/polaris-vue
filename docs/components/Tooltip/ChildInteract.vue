<template>
<div style="width: 200px">
  <ButtonGroup variant="segmented" fullWidth>
    <Tooltip content="Bold" dismissOnMouseOut>
      <Button>B</Button>
    </Tooltip>
    <Tooltip content="Italic" dismissOnMouseOut>
      <Button>I</Button>
    </Tooltip>
    <Tooltip content="Underline" dismissOnMouseOut>
      <Button>U</Button>
    </Tooltip>
    <Tooltip content="Strikethrough" dismissOnMouseOut>
      <Button>S</Button>
    </Tooltip>
  </ButtonGroup>
  <TextField
    label="Product title"
    autoComplete="off"
    labelHidden
    multiline
  />
</div>
</template>
