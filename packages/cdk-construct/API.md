# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CrushTest <a name="CrushTest" id="@pwrdrvr/crush-test-cdk.CrushTest"></a>

A reusable CDK construct that creates a Lambda function from a Docker image, with S3 read access and configurable memory and environment.

#### Initializers <a name="Initializers" id="@pwrdrvr/crush-test-cdk.CrushTest.Initializer"></a>

```typescript
import { CrushTest } from '@pwrdrvr/crush-test-cdk'

new CrushTest(scope: Construct, id: string, props: CrushTestProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pwrdrvr/crush-test-cdk.CrushTest.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The parent construct. |
| <code><a href="#@pwrdrvr/crush-test-cdk.CrushTest.Initializer.parameter.id">id</a></code> | <code>string</code> | The construct ID. |
| <code><a href="#@pwrdrvr/crush-test-cdk.CrushTest.Initializer.parameter.props">props</a></code> | <code><a href="#@pwrdrvr/crush-test-cdk.CrushTestProps">CrushTestProps</a></code> | Configuration properties. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pwrdrvr/crush-test-cdk.CrushTest.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The parent construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@pwrdrvr/crush-test-cdk.CrushTest.Initializer.parameter.id"></a>

- *Type:* string

The construct ID.

---

##### `props`<sup>Required</sup> <a name="props" id="@pwrdrvr/crush-test-cdk.CrushTest.Initializer.parameter.props"></a>

- *Type:* <a href="#@pwrdrvr/crush-test-cdk.CrushTestProps">CrushTestProps</a>

Configuration properties.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pwrdrvr/crush-test-cdk.CrushTest.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@pwrdrvr/crush-test-cdk.CrushTest.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pwrdrvr/crush-test-cdk.CrushTest.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pwrdrvr/crush-test-cdk.CrushTest.isConstruct"></a>

```typescript
import { CrushTest } from '@pwrdrvr/crush-test-cdk'

CrushTest.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pwrdrvr/crush-test-cdk.CrushTest.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pwrdrvr/crush-test-cdk.CrushTest.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pwrdrvr/crush-test-cdk.CrushTest.property.lambdaFunction">lambdaFunction</a></code> | <code>aws-cdk-lib.aws_lambda.DockerImageFunction</code> | The underlying DockerImageFunction Lambda resource. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pwrdrvr/crush-test-cdk.CrushTest.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `lambdaFunction`<sup>Required</sup> <a name="lambdaFunction" id="@pwrdrvr/crush-test-cdk.CrushTest.property.lambdaFunction"></a>

```typescript
public readonly lambdaFunction: DockerImageFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.DockerImageFunction

The underlying DockerImageFunction Lambda resource.

---


## Structs <a name="Structs" id="Structs"></a>

### CrushTestProps <a name="CrushTestProps" id="@pwrdrvr/crush-test-cdk.CrushTestProps"></a>

Properties for configuring the {@link CrushTest} construct.

#### Initializer <a name="Initializer" id="@pwrdrvr/crush-test-cdk.CrushTestProps.Initializer"></a>

```typescript
import { CrushTestProps } from '@pwrdrvr/crush-test-cdk'

const crushTestProps: CrushTestProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pwrdrvr/crush-test-cdk.CrushTestProps.property.dockerImageCode">dockerImageCode</a></code> | <code>aws-cdk-lib.aws_lambda.DockerImageCode</code> | The Docker image code to use for the Lambda. |
| <code><a href="#@pwrdrvr/crush-test-cdk.CrushTestProps.property.environment">environment</a></code> | <code>{[ key: string ]: string}</code> | Optional environment variables for the Lambda. |
| <code><a href="#@pwrdrvr/crush-test-cdk.CrushTestProps.property.functionName">functionName</a></code> | <code>string</code> | The name of the Lambda function. |
| <code><a href="#@pwrdrvr/crush-test-cdk.CrushTestProps.property.memorySize">memorySize</a></code> | <code>number</code> | Memory size in MB for the Lambda function. |

---

##### `dockerImageCode`<sup>Optional</sup> <a name="dockerImageCode" id="@pwrdrvr/crush-test-cdk.CrushTestProps.property.dockerImageCode"></a>

```typescript
public readonly dockerImageCode: DockerImageCode;
```

- *Type:* aws-cdk-lib.aws_lambda.DockerImageCode

The Docker image code to use for the Lambda.

This should be a DockerImageCode instance, typically from an ECR asset or image URI.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="@pwrdrvr/crush-test-cdk.CrushTestProps.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Optional environment variables for the Lambda.

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="@pwrdrvr/crush-test-cdk.CrushTestProps.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

The name of the Lambda function.

If not provided, a default will be used.

---

##### `memorySize`<sup>Optional</sup> <a name="memorySize" id="@pwrdrvr/crush-test-cdk.CrushTestProps.property.memorySize"></a>

```typescript
public readonly memorySize: number;
```

- *Type:* number
- *Default:* 2048

Memory size in MB for the Lambda function.

---



