/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface VaultInterface extends utils.Interface {
  functions: {
    "APY()": FunctionFragment;
    "_calculateReturn(uint256)": FunctionFragment;
    "adminAddress()": FunctionFragment;
    "adminDeposit(address,uint256)": FunctionFragment;
    "adminWithdraw(address,uint256)": FunctionFragment;
    "burnAddress()": FunctionFragment;
    "deposit(uint256)": FunctionFragment;
    "inputTokenAddress()": FunctionFragment;
    "inputTokenDecimal()": FunctionFragment;
    "lockPeriod()": FunctionFragment;
    "outputTokenAddress()": FunctionFragment;
    "outputTokenDecimal()": FunctionFragment;
    "rebase(address)": FunctionFragment;
    "redeem(uint256)": FunctionFragment;
    "totalBonds(address)": FunctionFragment;
    "totalDeposited(address)": FunctionFragment;
    "totalRedeemable(address)": FunctionFragment;
    "totalValueLocked()": FunctionFragment;
    "wrappedTokenAddress()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "APY", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "_calculateReturn",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "adminAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "adminDeposit",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "adminWithdraw",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "burnAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "inputTokenAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "inputTokenDecimal",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lockPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "outputTokenAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "outputTokenDecimal",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "rebase", values: [string]): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "totalBonds", values: [string]): string;
  encodeFunctionData(
    functionFragment: "totalDeposited",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "totalRedeemable",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "totalValueLocked",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "wrappedTokenAddress",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "APY", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_calculateReturn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "adminAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "adminDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "adminWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "burnAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "inputTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "inputTokenDecimal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lockPeriod", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "outputTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "outputTokenDecimal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rebase", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalBonds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalDeposited",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalRedeemable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalValueLocked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "wrappedTokenAddress",
    data: BytesLike
  ): Result;

  events: {
    "DEPOSIT(address,uint256)": EventFragment;
    "REDEEM(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DEPOSIT"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "REDEEM"): EventFragment;
}

export type DEPOSITEvent = TypedEvent<
  [string, BigNumber],
  { _account: string; _amount: BigNumber }
>;

export type DEPOSITEventFilter = TypedEventFilter<DEPOSITEvent>;

export type REDEEMEvent = TypedEvent<
  [string, BigNumber],
  { _account: string; _amount: BigNumber }
>;

export type REDEEMEventFilter = TypedEventFilter<REDEEMEvent>;

export interface Vault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VaultInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    APY(overrides?: CallOverrides): Promise<[BigNumber]>;

    _calculateReturn(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    adminAddress(overrides?: CallOverrides): Promise<[string]>;

    adminDeposit(
      _tokenAddress: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    adminWithdraw(
      _tokenAddress: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    burnAddress(overrides?: CallOverrides): Promise<[string]>;

    deposit(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    inputTokenAddress(overrides?: CallOverrides): Promise<[string]>;

    inputTokenDecimal(overrides?: CallOverrides): Promise<[BigNumber]>;

    lockPeriod(overrides?: CallOverrides): Promise<[BigNumber]>;

    outputTokenAddress(overrides?: CallOverrides): Promise<[string]>;

    outputTokenDecimal(overrides?: CallOverrides): Promise<[BigNumber]>;

    rebase(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    redeem(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalBonds(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalDeposited(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalRedeemable(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalValueLocked(overrides?: CallOverrides): Promise<[BigNumber]>;

    wrappedTokenAddress(overrides?: CallOverrides): Promise<[string]>;
  };

  APY(overrides?: CallOverrides): Promise<BigNumber>;

  _calculateReturn(
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  adminAddress(overrides?: CallOverrides): Promise<string>;

  adminDeposit(
    _tokenAddress: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  adminWithdraw(
    _tokenAddress: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  burnAddress(overrides?: CallOverrides): Promise<string>;

  deposit(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  inputTokenAddress(overrides?: CallOverrides): Promise<string>;

  inputTokenDecimal(overrides?: CallOverrides): Promise<BigNumber>;

  lockPeriod(overrides?: CallOverrides): Promise<BigNumber>;

  outputTokenAddress(overrides?: CallOverrides): Promise<string>;

  outputTokenDecimal(overrides?: CallOverrides): Promise<BigNumber>;

  rebase(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  redeem(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalBonds(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

  totalDeposited(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  totalRedeemable(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  totalValueLocked(overrides?: CallOverrides): Promise<BigNumber>;

  wrappedTokenAddress(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    APY(overrides?: CallOverrides): Promise<BigNumber>;

    _calculateReturn(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    adminAddress(overrides?: CallOverrides): Promise<string>;

    adminDeposit(
      _tokenAddress: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    adminWithdraw(
      _tokenAddress: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    burnAddress(overrides?: CallOverrides): Promise<string>;

    deposit(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    inputTokenAddress(overrides?: CallOverrides): Promise<string>;

    inputTokenDecimal(overrides?: CallOverrides): Promise<BigNumber>;

    lockPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    outputTokenAddress(overrides?: CallOverrides): Promise<string>;

    outputTokenDecimal(overrides?: CallOverrides): Promise<BigNumber>;

    rebase(_account: string, overrides?: CallOverrides): Promise<void>;

    redeem(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    totalBonds(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    totalDeposited(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    totalRedeemable(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalValueLocked(overrides?: CallOverrides): Promise<BigNumber>;

    wrappedTokenAddress(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "DEPOSIT(address,uint256)"(
      _account?: null,
      _amount?: null
    ): DEPOSITEventFilter;
    DEPOSIT(_account?: null, _amount?: null): DEPOSITEventFilter;

    "REDEEM(address,uint256)"(
      _account?: null,
      _amount?: null
    ): REDEEMEventFilter;
    REDEEM(_account?: null, _amount?: null): REDEEMEventFilter;
  };

  estimateGas: {
    APY(overrides?: CallOverrides): Promise<BigNumber>;

    _calculateReturn(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    adminAddress(overrides?: CallOverrides): Promise<BigNumber>;

    adminDeposit(
      _tokenAddress: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    adminWithdraw(
      _tokenAddress: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    burnAddress(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    inputTokenAddress(overrides?: CallOverrides): Promise<BigNumber>;

    inputTokenDecimal(overrides?: CallOverrides): Promise<BigNumber>;

    lockPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    outputTokenAddress(overrides?: CallOverrides): Promise<BigNumber>;

    outputTokenDecimal(overrides?: CallOverrides): Promise<BigNumber>;

    rebase(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    redeem(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalBonds(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    totalDeposited(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    totalRedeemable(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalValueLocked(overrides?: CallOverrides): Promise<BigNumber>;

    wrappedTokenAddress(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    APY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _calculateReturn(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    adminAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    adminDeposit(
      _tokenAddress: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    adminWithdraw(
      _tokenAddress: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    burnAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposit(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    inputTokenAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    inputTokenDecimal(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lockPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    outputTokenAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    outputTokenDecimal(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rebase(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    redeem(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalBonds(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalDeposited(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalRedeemable(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalValueLocked(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wrappedTokenAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
